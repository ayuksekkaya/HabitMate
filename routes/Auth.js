const router = require('express').Router();
const SignupUser = require('../controllers/Auth/Signup');
const LoginUser = require('../controllers/Auth/Login');
const LogoutUser = require('../controllers/Auth/Logout');
const passport = require('passport');


router.post('/signup', SignupUser);
router.post('/login', passport.authenticate('local'), LoginUser);
router.get('/logout', LogoutUser);


module.exports = router;