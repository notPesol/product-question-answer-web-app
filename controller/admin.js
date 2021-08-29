// fake admin 
const adminLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1111') {
    req.session.admin = { username };
    req.flash('success', 'Welcome back admin');
    return next();
  }
  req.flash('error', 'Authenticate fail')
  return res.redirect('/login');
}

const isAdmin = (req, res, next) => {
  const { admin } = res.locals;
  if (!admin) {
    req.flash('error', "You can't go there !")
    return res.redirect('/');
  }
  return next();
}

module.exports = {
  adminLogin,
  isAdmin
}