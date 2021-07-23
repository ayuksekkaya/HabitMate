const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ChatSchema = new Schema({
    message: { type: String, default: "", trim: true },
    sender: { type: Schema.ObjectId, ref: "User" },
    receiver: { type: Schema.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
  });
  
 module.exports =  mongoose.model("Chat", ChatSchema);
