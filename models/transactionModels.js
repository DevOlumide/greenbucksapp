const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  
  email: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model("transaction_History",transactionSchema);