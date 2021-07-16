const User = require("../../Models/user");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


module.exports = (req, res) => {
console.log(req.body)
//register(user,passowrd,cb)
User.register( new User({
    username: req.body.username,
    name: req.body.name,
}), req.body.password, function(err, user){
    
    if (err) {
        console.log(err);
        res.redirect('register');
    }

    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })    
})

};