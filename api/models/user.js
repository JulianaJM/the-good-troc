const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true },
  passwordHash: { type: String, required: true },
  inProgressBarter:  { type: Number, default: 0 },
  doneBarter: { type: Number, default: 0 },
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(12), null);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
