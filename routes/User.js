const router = require('express').Router();
const { render } = require('ejs');
const User = require('../controllers/User/proflie');





// Get the profile page of the user
router.get("/:id/profile", isLoggedIn, User.displayUser);


// Handle searches made throught the serach bar
router.post('/search' , User.search);

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;