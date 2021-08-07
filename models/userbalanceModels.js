const mongoose = require('mongoose');

const UserBalanceSchema = mongoose.Schema({
  buckID: {
    type: String,
    required: true
  },
  email: {
  type: String,
  required: true
  },
  balance: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("userBalance", UserBalanceSchema);