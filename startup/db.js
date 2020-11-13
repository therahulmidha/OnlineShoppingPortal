const mongoose = require("mongoose");
const config = require("config");
const logger = require("winston");
const username = config.get("db.username");
const password = config.get("db.password");
const dbName = config.get("dbName");
const mongoUri = `mongodb+srv://${username}:${password}@cluster0.vcyez.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`

async function configureDB() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        logger.info("MongoDB database connection established successfully");
        console.log("MongoDB database connection established successfully");
    } catch (err) {
        logger.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports.configureDB = configureDB;
module.exports.mongoUri = mongoUri;