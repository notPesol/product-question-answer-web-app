const mongoose = require('mongoose');
require('dotenv').config()

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

function conDB() {
  mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dshvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
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