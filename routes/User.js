const router = require('express').Router();
const { render } = require('ejs');
const User = require("../Models/user");



router.get("/:id/profile", isLoggedIn, function(req, res){

    User.findById(req.params.id)
    .populate('friends')
    .exec((err, user) => {
        if (err){
            console.log(err);
            req.flash(err, "There was an error");
            res.redirect("/");
        }

        else{
            console.log("Here");
            console.log(user);
            res.render("user/profile", {currentUser: user});
        }
    });


});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;