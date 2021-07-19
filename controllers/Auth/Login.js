const passport = require('passport');

module.exports = (req, res) => { 
    const user_id = req.user.id;
    console.log("here in login.js");
    res.redirect('/user/' + user_id + "/profile");
}