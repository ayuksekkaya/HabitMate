const User = require("../../Models/user");
const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');



module.exports = (req, res) => {
console.log(req.body)
//register(user,passowrd,cb)
User.register( new User({
    username: req.body.username,
    name: req.body.name,
    zipcode: req.body.zipcode
// eslint-disable-next-line no-unused-vars
}), req.body.password, function(err, user){
    
    if (err) {
        console.log(err);
        res.render("signup");
    }

    passport.authenticate("local")(req,res,function(){
        // res.redirect("/login");
        res.redirect("/user/" + req.user.id + "/profile");
    })    
})

};