const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const path = require('path');

const session = require('express-session');

const ejsMateEngine = require('ejs-mate');

const flash = require('connect-flash');

// connect database // check type file
const { conDB } = require('./utils');

// Auth middleware
const { adminLogin, isAdmin } = require('./controller/admin');

// Controller
const { register, userLogin } = require('./controller/user');
const { getProduct, uploadFile } = require('./controller/product');
const { addQuestion } = require('./controller/question')

// hashing function
const bcrypt = require('bcrypt');

// Models
const Product = require('./Models/Product');


// connect to database
conDB();

app.use(session({
  secret: process.env.SECRET || 'THISMUSTSECRETOK',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

app.use(express.static(path.join(__dirname, '/public')));

app.engine('ejs', ejsMateEngine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));

const title = 'Products';

app.use((req, res, next) => {
  res.locals.admin = req.session.admin;
  res.locals.user = req.session.user;
  next();
});

app.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('index', { title, products, success: req.flash('success'), error: req.flash('error') });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Admin login', error: req.flash('error') });
});

app.get('/add', isAdmin, (req, res) => {
  res.render('add', { title: 'Add Product', error: req.flash('error'), success: req.flash('success') });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'User Register', error: req.flash('error'), success: req.flash('success') })
});

app.post('/register', register);

app.get('/userlogin', (req, res) => {
  res.render('userlogin', { title: 'User Login', error: req.flash('error'), success: req.flash('success') })
});

app.post('/userlogin', userLogin);

// for admin logout
app.get('/logout', (req, res) => {
  delete req.session.admin;
  res.redirect('/');
});
// for user logout
app.get('/userlogout', (req, res) => {
  delete req.session.user;
  res.redirect('/');
});

app.get('/:productId', getProduct);

app.post('/add', isAdmin, uploadFile);

app.post('/login', adminLogin, (req, res) => {
  res.redirect('/');
});

app.post('/question/:productId', addQuestion);




app.listen(PORT, () => {
  console.log('Application running on port:', PORT);
});