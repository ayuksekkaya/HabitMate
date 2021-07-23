const router = require('express').Router();
// const { render } = require('ejs');
const User = require('../controllers/User/proflie');





// Get the profile page of the user
router.get("/:id/profile", isLoggedIn, User.displayUser);
// Handle searches made throught the serach bar
router.post('/search' , User.search);
// Handle follow request
router.post('/follow', isLoggedIn, User.follow);

// Get the chats of user
router.get('/:id/messages', User.getMessages);

router.get('/:id/send/messages', User.messageScreen)
router.post('/send/messages', User.sendMessage);

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;