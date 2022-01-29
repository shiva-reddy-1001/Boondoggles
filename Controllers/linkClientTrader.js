const {User} = require("../Models/UserModel");

function addLink(req,res) {
    User.findOne({username: req.body.username1}, (err, user1) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else if (user1) {
            User.findOne({username: req.body.username2},async (err, user2) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Internal server error");
                } else if (user2) {
                    await User.updateOne({ username: user1.username }, { $addToSet: { linked: req.body.username2 } });
                    await User.updateOne({ username: user2.username }, { $addToSet: { linked: req.body.username1 } });
                    res.status(200).send("added")
                }
            })
        }
    })
};
function getAllTraders(req,res){
    User.find({role: true},(err, traders) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else if (traders) {
            res.status(200).send(traders);
        }
    })
};
function getAllClients(req,res){
    User.find({role: false}, (err, clients) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else if (clients) {
            res.status(200).send(clients);
        }
    })
}
function getLinks(req,res){
    User.findOne({username:req.body.username},(err,user)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else if (user) {
            res.status(200).send(user.linked);
        }
    })
}
module.exports = { addLink, getAllTraders, getAllClients, getLinks};