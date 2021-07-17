const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const mongoose = require('mongoose');
const AuthRoute = require('./routes/Auth');
const UserRoute = require('./routes/User');
const flash = require('flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./Models/user');


mongoose.connect("mongodb://localhost/auth_demo", { useNewUrlParser: true , useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use("/styles/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // <- This will use the contents of 'bootstrap/dist/css' which is placed in your node_modules folder as if it is in your '/styles/css' directory.



app.use(require("express-session")({
secret:"very very secret keyword",
    resave: false,          
    saveUninitialized:false    
}));


//For passport-local-mongoose
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
app.use('/api', AuthRoute);
app.use('/user', UserRoute);


app.get("/", (req,res) =>{
    res.render("home");
})

app.get("/userprofile" ,isLoggedIn, (req,res) =>{

    res.render("userprofile", {user: req.user});
})
//Auth Routes
app.get('/login',(req,res)=>{
    res.render("login");
});
app.get('/signup',(req,res)=>{
    res.render("signup");
});


function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("App is running");
});

