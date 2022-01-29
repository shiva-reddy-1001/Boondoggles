const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user1 : {
        type: String,
        required: true
    },
    user2 : {
        type: String,
        required: true
    },
    chats: [{_id : false, sender:String, message:String}],
  });
  
  const Chat=mongoose.model("Chat",chatSchema);
  
  module.exports = {
	Chat: Chat
};