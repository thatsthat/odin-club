const mongoose = require("mongoose");

// a name, description, category, price, number-in-stock and URL

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 400 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number },
  stocked: { type: Number },
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/inventory/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
