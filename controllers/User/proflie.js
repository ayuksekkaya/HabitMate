/* eslint-disable no-unused-vars */
const User = require("../../Models/user");
// eslint-disable-next-line no-unused-vars
const Activity = require("../../Models/activity");
const Chat = require("../../Models/chat");


const UserMethods = {
  displayUser: function (req, res) {
    User.findById(req.params.id)
      .populate("friends")
      .exec((err, user) => {
        if (err) {
          console.log(err);
          req.flash(err, "There was an error");
          res.redirect("/");
        } else {
          //console.log(user.friends[0].username);
          res.render("user/profile", { currentUser: user });
        }
      });
  },


  
  search: async function (req, res) {
    let regex = new RegExp(req.body.query, "i");
    let options = req.body.advanced;
    let query;

    if (options === "all") {
        query = { $or: [{ username: regex }, { name: regex }, { zipcode: regex }] };
    } else if (options === "username") {
        query = {username: regex};
    } else if (options === "zipcode") {
        query = {zipcode: regex};
    }
    // Add activity


    User.find( query,
      function (err, users) {
        if (err) {
          console.log(err);
          res.render('/error')
        } else {
          res.render("user/searchresults", {user: req.user, results: users});
        }
      }
    );
  },


  follow: async function (req, res) {
      let toBeAdded = req.body.toBeFollowed
      // eslint-disable-next-line no-unused-vars
      User.findByIdAndUpdate(req.user.id, {$push: {friends: toBeAdded}}, {useFindAndModify: false}, function(err, user) {
          if(err) {
            console.log(err);
          } else{
            res.send("friend added");
          }
      });
  },

  messageScreen: async function(req, res) {
    let receiverId = req.params.id
    User.findById(receiverId, function(err, user) {
      if (err) {
        console.log(err);
        res.render('err');
      }else {
        res.render('user/messagescreen', {user: user})
      }
    })
    


  },

  sendMessage: async function(req, res) {

    let text = req.body.text 
    let receiver = req.body.receiver
    
    Chat.create({
      message: text,
      sender: req.user.id,
      receiver: receiver
    }, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/user/' + req.user.id + '/messages');
      }
    } )

  },

  getMessages: async function(req, res) {
    Chat.find({ $or: [{sender: req.user.id  }, { receiver: req.user.id }] }, (err, foundMessages) => 
    {
      if (err){
        console.log(err);
      } else {
        res.render('user/messages', {messages: foundMessages});
      }
    })
  },

  getHabitPage: async function(req, res) {
    let user = req.user.id
    res.render('user/createHabit', {user: user});
  },

  createHabit: function(req, res) {
    res.send("<h1>Okay</h1>");
  } 
};

module.exports = UserMethods;
