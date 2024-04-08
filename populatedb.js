#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Fruit category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, price, stocked, category) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    stocked: stocked,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Fruits", "Fruits"),
    categoryCreate(1, "Vegetables", "Vegetables"),
    categoryCreate(2, "Canned Goods", "Canned Goods"),
    categoryCreate(3, "Dairy", "Dairy"),
    categoryCreate(4, "Meat", "Meat"),
    categoryCreate(5, "Fish & Seafood", "Fish & Seafood"),
    categoryCreate(6, "Deli", "Deli"),
    categoryCreate(7, "Condiments & Spices", "Condiments & Spices"),
    categoryCreate(8, "Snacks", "Snacks"),
    categoryCreate(9, "Bread & Bakery", "Bread & Bakery"),
    categoryCreate(10, "Beverages", "Beverages"),
    categoryCreate(11, "Pasta, Rice & Cerea", "Pasta, Rice & Cerea"),
    categoryCreate(12, "Baking", "Baking"),
    categoryCreate(13, "Frozen Foods", "Frozen Foods"),
    categoryCreate(14, "Personal Care", "Personal Care"),
    categoryCreate(15, "Health Care", "Health Care"),
    categoryCreate(
      16,
      "Household & Cleaning Supplies",
      "Household & Cleaning Supplies"
    ),
    categoryCreate(17, "Baby Items", "Baby Items"),
    categoryCreate(18, "Pet Care", "Pet Care"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, "Apples", "Apples", 5, 10, categories[0]),
    itemCreate(1, "bananas", "bananas", 5, 10, categories[0]),
    itemCreate(2, "grapes", "grapes", 5, 10, categories[0]),
    itemCreate(3, "oranges", "oranges", 5, 10, categories[0]),
    itemCreate(4, "strawberries", "strawberries", 5, 10, categories[0]),
    itemCreate(5, "avocados", "avocados", 5, 10, categories[0]),
    itemCreate(6, "peaches", "peaches", 5, 10, categories[0]),
    itemCreate(7, "Potatoes", "Potatoes", 5, 10, categories[1]),
    itemCreate(8, "onions", "onions", 5, 10, categories[1]),
    itemCreate(9, "carrots", "carrots", 5, 10, categories[1]),
    itemCreate(10, "salad greens", "salad greens", 5, 10, categories[1]),
    itemCreate(11, "broccoli", "broccoli", 5, 10, categories[1]),
    itemCreate(12, "peppers", "peppers", 5, 10, categories[1]),
    itemCreate(13, "tomatoes", "tomatoes", 5, 10, categories[1]),
    itemCreate(14, "cucumbers", "cucumbers", 5, 10, categories[1]),
    itemCreate(15, "Soup", "Soup", 5, 10, categories[2]),
    itemCreate(16, "tuna", "tuna", 5, 10, categories[2]),
    itemCreate(17, "fruit", "fruit", 5, 10, categories[2]),
    itemCreate(18, "beans", "beans", 5, 10, categories[2]),
    itemCreate(19, "vegetables", "vegetables", 5, 10, categories[2]),
    itemCreate(20, "pasta sauce", "pasta sauce", 5, 10, categories[2]),
    itemCreate(21, "Butter;", "Butter;", 5, 10, categories[3]),
    itemCreate(22, "cheese;", "cheese;", 5, 10, categories[3]),
    itemCreate(23, "eggs;", "eggs;", 5, 10, categories[3]),
    itemCreate(24, "milk;", "milk;", 5, 10, categories[3]),
    itemCreate(25, "yogurt;", "yogurt;", 5, 10, categories[3]),
    itemCreate(26, "Chicken;", "Chicken;", 5, 10, categories[4]),
    itemCreate(27, "beef;", "beef;", 5, 10, categories[4]),
    itemCreate(28, "pork;", "pork;", 5, 10, categories[4]),
    itemCreate(29, "sausage;", "sausage;", 5, 10, categories[4]),
    itemCreate(30, "bacon;", "bacon;", 5, 10, categories[4]),
    itemCreate(31, "Shrimp;", "Shrimp;", 5, 10, categories[5]),
    itemCreate(32, "crab;", "crab;", 5, 10, categories[5]),
    itemCreate(33, "cod;", "cod;", 5, 10, categories[5]),
    itemCreate(34, "tuna;", "tuna;", 5, 10, categories[5]),
    itemCreate(35, "salmon;", "salmon;", 5, 10, categories[5]),
    itemCreate(36, "Cheese;", "Cheese;", 5, 10, categories[6]),
    itemCreate(37, "salami;", "salami;", 5, 10, categories[6]),
    itemCreate(38, "ham;", "ham;", 5, 10, categories[6]),
    itemCreate(39, "turkey;", "turkey;", 5, 10, categories[6]),
    itemCreate(40, "Black pepper", "Black pepper", 5, 10, categories[7]),
    itemCreate(41, "oregano", "oregano", 5, 10, categories[7]),
    itemCreate(42, "cinnamon", "cinnamon", 5, 10, categories[7]),
    itemCreate(43, "sugar", "sugar", 5, 10, categories[7]),
    itemCreate(44, "olive oil", "olive oil", 5, 10, categories[7]),
    itemCreate(45, "ketchup", "ketchup", 5, 10, categories[7]),
    itemCreate(46, "mayonnaise", "mayonnaise", 5, 10, categories[7]),
    itemCreate(47, "Chips", "Chips", 5, 10, categories[8]),
    itemCreate(48, "pretzels", "pretzels", 5, 10, categories[8]),
    itemCreate(49, "popcorn", "popcorn", 5, 10, categories[8]),
    itemCreate(50, "crackers", "crackers", 5, 10, categories[8]),
    itemCreate(51, "nuts", "nuts", 5, 10, categories[8]),
    itemCreate(52, "Bread;", "Bread;", 5, 10, categories[9]),
    itemCreate(53, "tortillas;", "tortillas;", 5, 10, categories[9]),
    itemCreate(54, "pies;", "pies;", 5, 10, categories[9]),
    itemCreate(55, "muffins;", "muffins;", 5, 10, categories[9]),
    itemCreate(56, "bagels;", "bagels;", 5, 10, categories[9]),
    itemCreate(57, "cookies;", "cookies;", 5, 10, categories[9]),
    itemCreate(58, "Coffee;", "Coffee;", 5, 10, categories[10]),
    itemCreate(59, "teabags;", "teabags;", 5, 10, categories[10]),
    itemCreate(60, "milk;", "milk;", 5, 10, categories[10]),
    itemCreate(61, "juice;", "juice;", 5, 10, categories[10]),
    itemCreate(62, "soda;", "soda;", 5, 10, categories[10]),
    itemCreate(63, "beer;", "beer;", 5, 10, categories[10]),
    itemCreate(64, "wine;", "wine;", 5, 10, categories[10]),
    itemCreate(65, "Oats", "Oats", 5, 10, categories[11]),
    itemCreate(66, "granola", "granola", 5, 10, categories[11]),
    itemCreate(67, "brown rice", "brown rice", 5, 10, categories[11]),
    itemCreate(68, "white rice", "white rice", 5, 10, categories[11]),
    itemCreate(69, "macaroni", "macaroni", 5, 10, categories[11]),
    itemCreate(70, "noodles", "noodles", 5, 10, categories[11]),
    itemCreate(71, "Flour", "Flour", 5, 10, categories[12]),
    itemCreate(72, "powdered sugar", "powdered sugar", 5, 10, categories[12]),
    itemCreate(73, "baking powder", "baking powder", 5, 10, categories[12]),
    itemCreate(74, "cocoa", "cocoa", 5, 10, categories[12]),
    itemCreate(75, "Pizza", "Pizza", 5, 10, categories[13]),
    itemCreate(76, "fish", "fish", 5, 10, categories[13]),
    itemCreate(77, "potatoes", "potatoes", 5, 10, categories[13]),
    itemCreate(78, "ready meals", "ready meals", 5, 10, categories[13]),
    itemCreate(79, "ice cream", "ice cream", 5, 10, categories[13]),
    itemCreate(80, "Shampoo", "Shampoo", 5, 10, categories[14]),
    itemCreate(81, "conditioner", "conditioner", 5, 10, categories[14]),
    itemCreate(82, "deodorant", "deodorant", 5, 10, categories[14]),
    itemCreate(83, "toothpaste", "toothpaste", 5, 10, categories[14]),
    itemCreate(84, "dental floss", "dental floss", 5, 10, categories[14]),
    itemCreate(85, "Saline", "Saline", 5, 10, categories[15]),
    itemCreate(86, "band-aid", "band-aid", 5, 10, categories[15]),
    itemCreate(
      87,
      "cleaning alcohol",
      "cleaning alcohol",
      5,
      10,
      categories[15]
    ),
    itemCreate(88, "pain killers", "pain killers", 5, 10, categories[15]),
    itemCreate(89, "antacids", "antacids", 5, 10, categories[15]),
    itemCreate(
      90,
      "Laundry detergent",
      "Laundry detergent",
      5,
      10,
      categories[16]
    ),
    itemCreate(91, "dish soap", "dish soap", 5, 10, categories[16]),
    itemCreate(
      92,
      "dishwashing liquid",
      "dishwashing liquid",
      5,
      10,
      categories[16]
    ),
    itemCreate(93, "paper towels", "paper towels", 5, 10, categories[16]),
    itemCreate(94, "tissues", "tissues", 5, 10, categories[16]),
    itemCreate(95, "trash bags", "trash bags", 5, 10, categories[16]),
    itemCreate(96, "aluminum foil", "aluminum foil", 5, 10, categories[16]),
    itemCreate(97, "zip bags", "zip bags", 5, 10, categories[16]),
    itemCreate(98, "diapers", "diapers", 5, 10, categories[17]),
    itemCreate(99, "wet wipes", "wet wipes", 5, 10, categories[17]),
    itemCreate(100, "lotion", "lotion", 5, 10, categories[17]),
    itemCreate(101, "Pet food", "Pet food", 5, 10, categories[18]),
    itemCreate(102, "kitty litter", "kitty litter", 5, 10, categories[18]),
    itemCreate(103, "chew toys", "chew toys", 5, 10, categories[18]),
    itemCreate(104, "pet treats", "pet treats", 5, 10, categories[18]),
    itemCreate(105, "pet shampoo", "pet shampoo", 5, 10, categories[18]),
  ]);
}
