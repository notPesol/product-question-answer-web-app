// Models
const Product = require('../Models/Product');
const User = require('../Models/User');
const Question = require('../Models/Question');

const addQuestion = async (req, res) => {
  const { productId } = req.params;
  try {
    const { question: text } = req.body;
    if (text.length < 5) {
      throw new Error('Question too short!');
    }
    const user = await User.findById(res.locals.user._id);
    const product = await Product.findById(productId);
    if (!user || !product) {
      throw new Error('No product or not login');
    }
    const question = new Question({
      questioner: user,
      question: text,
    });
    await question.save();
    await product.questions.push(question);
    await product.save();
    req.flash('success', 'Send question successfully');
    res.redirect(`/${productId}`);
  } catch (error) {
    req.flash('error', 'Something went wrong: ' + error);
    res.redirect(`/${productId}`);
  }
};

module.exports = {
  addQuestion
}