const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  questioner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  question: {
    type: String,
    required: true
  },
  dateAsk: {
    required: true,
    type: Date,
    default: Date.now
  },
  answer: String,
  dateReplied: {
    type: Date,
  }
});

module.exports = mongoose.model('Question', questionSchema);