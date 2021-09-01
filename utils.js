const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

function conDB() {
  mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dshvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(_ => {
      console.log('database connected');
    })
    .catch(err => {
      console.log("can't connect database", err);
    });
}

module.exports = {
  conDB,
};