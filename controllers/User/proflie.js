const User = require("../../Models/user");


module.exports = function(req, res){

    User.findById(req.params.id)
    .populate('friends')
    .exec((err, user) => {
        if (err){
            console.log(err);
            req.flash(err, "There was an error");
            res.redirect("/");
        }

        else{
            res.render("user/profile", {currentUser: user});
        }
    });
}