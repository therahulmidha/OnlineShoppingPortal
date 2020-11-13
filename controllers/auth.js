const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('config');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    isAdmin: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    isAdmin: false
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  let isAdmin = false;
  if(email === config.get('adminEmail')){
    isAdmin = true;
  }
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(result => {
          if (result) {
            // establish a session
            req.session.isLoggedIn = true;
            req.session.isAdmin = isAdmin;
            req.session.user = user;
            return req.session.save(err => {
              return res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/login');
        })
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
