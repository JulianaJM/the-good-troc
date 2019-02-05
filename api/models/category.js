const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema   = mongoose.Schema;

const CategorySchema = Schema({
  name: { type: String, required: true, unique: true },
  content: { type: [String], required: true }
});

CategorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
