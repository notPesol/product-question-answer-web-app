const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
// Models
const Product = require('./Models/Product');
// upload folder
const uploadDir = path.join(__dirname, '/public', '/images');

function conDB() {
  mongoose.connect('mongodb://localhost:27017/productApp')
    .then(_ => {
      console.log('database connected');
    })
    .catch(err => {
      console.log("can't connect database", err);
    });
}

const isFileValid = (file) => {
  const type = file.type.split("/").pop();
  const validTypes = ["jpg", "jpeg", "png"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

const uploadFile = async (req, res, next) => {
  const form = formidable({
    uploadDir,
    maxFileSize: 5 * 1024 * 1024
  });

  // handle form multipart/form-data
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }
    // for single file
    if (!files.img.length) {
      const file = files.img;

      const isValid = isFileValid(file);
      // create a file name
      const fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));
      // get fields
      const { name, detail } = fields;

      if (!isValid) {
        req.flash('error', "The file type is not a valid type");
        return res.redirect('/add');
      }
      // rename file
      try {
        fs.renameSync(file.path, path.join(uploadDir, fileName));
      } catch (error) {
        req.flash('error', "The file can't rename: " + error);
        return res.redirect('/add');
      }
      // save to mongo database
      try {
        const product = new Product({ name, detail, img: `images/${fileName}` });
        await product.save();

        req.flash('success', "The file saved");
        return res.redirect('/add');
      } catch (error) {
        req.flash('error', "The file can't save: " + error);
      }
    }
  });
};

module.exports = {
  conDB,
};