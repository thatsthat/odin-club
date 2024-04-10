const Item = require("../models/item");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items and categories counts (in parallel)
  const [numItems, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Home",
    item_count: numItems,
    category_count: numCategories,
  });
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name price stocked")
    .sort({ name: 1 })
    .populate("price")
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create GET");
});

// Handle Item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST");
});

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});
