require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const connect = require("./config/db");
const passport = require("./config/authentication");
const logger = require("morgan");
const path = require("path");
var serveStatic = require("serve-static");

// mongoose connect
connect();

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(serveStatic(path.join(__dirname, "../frontend/public")));
// app.use(express.static(path.join(__dirname, '../frontend/public')));

const index = require("./routes/index");
const authRoutes = require("./routes/authentication");
app.use("/auth", authRoutes);
app.use("/api", index);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err, res, req);
  // send the error
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
