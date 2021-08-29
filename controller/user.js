const User = require('../Models/User');
const bcrypt = require('bcrypt');
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashPass });
    await user.save();
    req.flash('success', 'Register successfully');
    res.redirect('/userlogin');
  } catch (error) {
    req.flash('error', 'Something went wrong: ' + error);
    res.redirect('/register');
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isTruePassword = await bcrypt.compare(password, user.password);
      if (isTruePassword) {
        req.session.user = user;
        req.flash('success', `Welcome back ${user.username}`);
        return res.redirect('/');
      }
      throw new Error('Username or Password incorrect!');
    } else {
      throw new Error('Username or Password incorrect!');
    }
  } catch (error) {
    req.flash('error', 'Something went wrong: ' + error);
    res.redirect('/userlogin');
  }
};

module.exports = {
  register,
  userLogin
}