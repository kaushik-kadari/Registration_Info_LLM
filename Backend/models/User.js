const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken : { type: String },
  resetPasswordExpires : { type: Date },
}, { collection : 'usersData' });

module.exports = mongoose.model('User', UserSchema);