const mongoose = require('mongoose')

function connectToMongo() {
    mongoose.connect("mongodb://127.0.0.1:27017/BlogApp", {
    useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then( () => console.log("DB Connection Successful!!") )
    .catch( (error) => {
        console.log("Issue in DB Connection!!");
        console.log(error.message);
        process.exit(1);
    });
}

module.exports = connectToMongo;