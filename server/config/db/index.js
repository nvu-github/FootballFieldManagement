const mongoose = require('mongoose');

async function connect() {
    // const mongoDbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    const mongoDbUrl = `mongodb+srv://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}@learnnodejs.lmgwdui.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
    console.log(`Connecting to ${mongoDbUrl}`);
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose.connect(mongoDbUrl
        , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    }
    ).then(() => {
        console.log("Successfully connected to the database");
    }).catch((err) => {
        console.log(`Could not connect to the database. Exiting now...\n ${err}`);
        process.exit();
    });
    // ,{
    //     useNewUrlParser: true,
    //     useUnifiedTopolygy: true,
    //     useCreateIndex: true
    // }
}


module.exports = { connect };