const mongoose = require("mongoose");


const ActivitySchema = new mongoose.Schema({
    name: String
    });


module.exports = mongoose.model("Activity", ActivitySchema);