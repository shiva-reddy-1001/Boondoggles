const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role : {                // false is for client, true for trader
        type: Boolean,
        required: true,
        default: false
    },
    linked: [String],
    
  });
  
  const User=mongoose.model("User",userSchema);
  
  module.exports = {
	User: User
    };