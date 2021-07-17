const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    zipcode: String,

    friends : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    activities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity"
        }
    ]
});

//passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);