const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  time: Date,
  type: {
    type: Number,
    default: -1
  },
  account: {
    type: Number,
    require: true,
    remarks: {
      type: String
    }
  }
});
const AccountModel = mongoose.model('accountBook', AccountSchema);

module.exports = AccountModel;