const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/UserAuthentication")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb connection failed");
  });
  
const usersSchema = new Schema({
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
