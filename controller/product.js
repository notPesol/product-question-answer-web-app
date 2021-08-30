// Models
const Product = require('../Models/Product');

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
// upload folder
const uploadDir = path.join(__dirname, '/public', '/images');


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

const getProduct = async (req, res) => {
  try {
    const moment = require('moment');
    const { productId } = req.params;
    const product = await Product.findById(productId).populate({
      path: 'questions',
      populate: 'questioner'
    });
    res.render('detail', { title: product.name.toUpperCase(), product, 
      success: req.flash('success'),
      error: req.flash('error'),
      moment
     });
  } catch (error) {
    req.flash('error', 'Something went wrong: ' + error);
    res.redirect('/');
  }
}

module.exports = {
  getProduct,
  uploadFile
}