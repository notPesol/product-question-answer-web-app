const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question"
  }
});

module.exports = mongoose.model('Product', productSchema);