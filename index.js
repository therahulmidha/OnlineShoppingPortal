const express = require('express');
const app = express();

(async () => {
    app.use(express.static(__dirname + '/public'));

    await require('./startup/logging')(app);
    await require('./startup/db').configureDB();
    await require('./startup/routeHandling')(app);
    await require('./startup/httpServer')(app);
    
    

    if (app.get("env") === "production") {
        require('./startup/prod');
    }
})();