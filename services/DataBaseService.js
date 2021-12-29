const mongodb = require('mongodb');
const urimongo = require("../resources/secret/databaseconfig.js").url;
const dbname = "punchliner" ;
const punchlinescollection = "punchlines" ;
//console.log(urimongo);

function getPunchlines(callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }).then(client => {
        client.db(dbname).collection(punchlinescollection).find().toArray().then(items => {
            callback(null, items);
            client.close();
        });
    }).catch(function(err){
        const error = new Error("unable to connect DB");
        error.code = 500 ;
        callback(error, null);});
}

function createPunchline(punchline, callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }).then(client => {
        client.db(dbname).collection(punchlinescollection).insertOne(punchline).then(function(data){
            callback(null, data.insertedId);
            client.close();
        });
    }).catch(function(err){
        console.log("error", err);
        const error = new Error("unable to connect DB");
        error.code = 500 ;
        callback(error, null);});
}

module.exports = {
    getPunchlines: getPunchlines,
    createPunchline: createPunchline,
}