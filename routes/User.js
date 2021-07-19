const router = require('express').Router();
const { render } = require('ejs');
const displayProfile = require('../controllers/User/proflie');



router.get("/:id/profile", isLoggedIn, displayProfile);

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;