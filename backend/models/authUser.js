const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AuthUser = new Schema({
  
  username: String,
  profileImage: String,
  email: String,
  password: String,
  custmoreinfo: [
    {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      age: String,
      country: String,
      gender: String,
      createdAt: Date,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});
AuthUser.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const AuthUserr = mongoose.model("User", AuthUser);
module.exports = AuthUserr;