const {Chat} = require("../Models/ChatModel");
const mongoose = require("mongoose");

function addNewChat(req,res){
    Chat.findOne({$or:[{user1:req.body.user1,user2:req.body.user2},{user1:req.body.user2,user2:req.body.user1}]},(err,chat1)=>{
        if(err){
            console.error(err);
            res.status(500).send("Internal server error");
        }else if(chat1){
            console.log("Chat already exists");
        }else{
            const chat = new Chat({
                user1:req.body.user1,
                user2:req.body.user2,
                chats:[]
            });
            chat.save(err_save => {
                if (err_save) {
                    console.error(err_save);
                    res.status(500).send("Internal server error");
                } else {
                    res.end();
                }
            });
        }
    })
};

function addMessage(req,res){
    Chat.findOne({$or:[{user1:req.body.user1,user2:req.body.user2},{user1:req.body.user2,user2:req.body.user1}]},async (err,chat)=>{
        if(err){
            console.error(err);
            res.status(500).send("Internal server error");
        }else if(chat){
            const id=mongoose.Types.ObjectId(chat._id)
            // console.log(req)
            const newMessage={ sender: req.username, message:req.body.message}
            await Chat.updateOne({_id:id}, { $push: {chats : newMessage}});
            res.status(200).send("message added")

        }else{
            console.log("Chat doesnt exist");
        }
    })
};
module.exports = { addNewChat, addMessage};