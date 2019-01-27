const mongoose = require("mongoose");

const connect = function() {
  mongoose
    .connect(
      process.env.MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(x => {
      console.log(
        `Connected to Mongo!!!! Database name: "${x.connections[0].name}"`
      );
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });
};

module.exports = connect;
