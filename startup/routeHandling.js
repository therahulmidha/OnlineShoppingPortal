const express = require('express');
const error = require('../middleware/error');
const shopRoute = require('../routes/shop');
const adminRoute = require('../routes/admin');
const { get404 } = require('../controllers/error');
const authRoutes = require('../routes/auth');
const User = require('../models/user');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const { mongoUri } = require('./db');

const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
module.exports = async function (app) {
    app.use(express.json());

    // Allowing body data be received from a form ui
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(express.static(path.join(__dirname, 'public')));

    const store = new MongoDbStore({
        uri: mongoUri,
        collection: 'sessions'
    })

    app.use(session({
        secret: config.get('sessionSecret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }))

    // ejs templating engine
    app.set('view engine', 'ejs');
    app.set('views', 'views'); // look for views in views folder

    app.use((req, res, next) => {
        if (!req.session.user) {
            return next();
        }
        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    });

    // Route endpoints
    // app.use('/api/user', require('../routes/api/userRoute'));
    app.use('/admin', adminRoute);
    app.use('/', shopRoute);
    app.use('/', authRoutes);

    // middleware for handling internal server error
    app.use(error);

    // Middleware for unknown endpoints
    app.use(get404);
}