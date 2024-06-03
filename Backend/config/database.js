const mongoose = require('mongoose')

function connectToMongo() {
    mongoose.connect("mongodb+srv://MettaHariKrishnaBhatlu:hari123@atlascluster.2lsyu6m.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=AtlasCluster", {
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
