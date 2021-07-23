
module.exports = (req, res) => { 
    const user_id = req.user.id;
    res.redirect('/user/' + user_id + "/profile");
}