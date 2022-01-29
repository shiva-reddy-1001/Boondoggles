const express=require("express");
const mongoose = require("mongoose");
var cors = require('cors');

const port = process.env.PORT || 8080;

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const {User} = require("./Models/UserModel");
const {Chat} = require("./Models/ChatModel");

const {checkQuotes} = require("./services/checkQuotes");
const runInfinite = setInterval(() => {
    checkQuotes();
}, 6000);

const auth_router = require("./routes/LoginRegister");
const link_router = require("./routes/linkClientTrader");
const chats_router = require("./routes/chats");
const azure_router = require("./routes/nerAzure");
app.use("/api", auth_router);
app.use("/api",link_router);
app.use("/api",chats_router);
app.use("/api",azure_router);

app.listen(port,function(){
    console.log("Server started");
});
