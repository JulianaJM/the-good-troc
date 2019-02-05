const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BarterItemSchema = Schema({
  title: { type:String, required: true},
  category: { type: String, required: true},
  description: { type: String, required: true },
  condition: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isUnderNegotiation: { type: Boolean, default: false}
});

const BarterItem = mongoose.model("BarterItem", BarterItemSchema);

module.exports = BarterItem;