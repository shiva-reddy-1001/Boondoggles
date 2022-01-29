const mongoose = require("mongoose");

const clientRequest = new mongoose.Schema({
    client : {
        type: String,
        required: true
    },
    trader : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },

})

const _ClientRequest = mongoose.model("ClientRequest",clientRequest);

module.exports = { 
    ClientRequest: _ClientRequest
};