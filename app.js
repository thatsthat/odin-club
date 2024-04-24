require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const User = require("./models/user");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const inventoryRouter = require("./routes/inventory"); //Import routes for "catalog" area of site

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://" +
  process.env.CREDENTIALS +
  "/odin_club?retryWrites=true&w=majority&appName=Odin";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
