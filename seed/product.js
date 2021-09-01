const { conDB } = require('../utils')
const Product = require('../Models/Product');

const productNames = ['shoe', 'bag', 'socks', 'shirt', 'skirt', 'glass', 'table'];
const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'black', 'purple'];

async function seedProducts(count) {
  conDB();
  for (let i = 0; i < count; i++) {
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const productName = color + name;
    const product = new Product({
      name: productName,
      detail: 'Come from seed file!'
    });
    await product.save();
  }
  console.log('Seed success');
}

seedProducts(20);