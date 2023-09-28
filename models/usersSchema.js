const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
  },
  password: {
    type: String,
    reqired: true,
  },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
