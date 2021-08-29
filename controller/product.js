// Models
const Product = require('../Models/Product');

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate({
      path: 'questions',
      populate: 'questioner'
    });
    console.log(product.questions[0].questioner);
    res.render('detail', { title: product.name.toUpperCase(), product, 
      success: req.flash('success'),
      error: req.flash('error') });
  } catch (error) {
    req.flash('error', 'Something went wrong: ' + error);
    res.redirect('/');
  }
}

module.exports = {
  getProduct
}