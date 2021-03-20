const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    to: {type:String,required:true},
    from: {type:String,required:true},
    type: {type:String, required:true},
    enc: {type: String},
    text: {type:String},
    timestamp: {type:Number,required:true}
});

module.exports = mongoose.model("Message", MessageSchema);