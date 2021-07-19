const Activity = require("./Models/activity");
const User = require("./Models/user");
const mongoose = require("mongoose");
const faker = require("faker");
const fs = require('fs');
const user = require("./Models/user");
const { dirname } = require("path");
const util = require('util');
let usersForWriting = new Array();


function dropDB() {
  //Check if collections exist. Drop if they do.
  mongoose.connect("mongodb://localhost/auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var db = mongoose.connection;
  db.once("open", (err, res) => {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      // console.log(names); // [{ name: 'dbname.myCollection' }]
      if (names.length > 1) {
        console.log("db connect");
        db.dropCollection("users", (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log("DB dropped sucessfully");
          }
        });
      } else {
        console.log("no collections to drop");
      }
    });
  });
}

function createUsers() {
  var usersAdded = new Array();
  //let i = 0;

  return new Promise((resolve) => {
      
      

      for (let i = 0; i < 20; i++) {
      let username = faker.internet.userName();
      let name = faker.name.firstName() + " " + faker.name.lastName();
      let zipcode = faker.address.zipCode();
      let password = faker.internet.password();

        usersForWriting.push(
          {
            "username" : username,
            "name" : name,
            "zipcode" : zipcode,
            "password" : password,
            "friends" : [],
            "activites" : []
          }
        );

        User.register(
          new User({
            username: username,
            name: name,
            zipcode: zipcode,
            friends: [],
          }),
          password,
          (err, user) => {
            if (err) {
              console.log(err);
            } else {
              usersAdded.push(user);
              i += 1;
              if (i == 20){
                console.log("users are created sucessfuly");
                resolve(usersAdded);
              }
            }
          }
        );
      }

  });

}

function createFriends(users) {

  User.find({}, function(err, users) {

    if(!err){
      for (let i = 0; i< users.length; i++) {
           user1 = users[i];
           user2 = users[users.length - i - 1];
           //console.log(user1);
          
           User.findByIdAndUpdate(user1.id, {$push : {friends: user2._id}}, {useFindAndModify: false}, function (err, foundList){
             if (err) {
               console.log(err);
             }
            });
            User.findByIdAndUpdate(user2.id, {$push : {friends: user1._id}}, {useFindAndModify: false}, function (err, foundList){
              if (err) {
                console.log(err);
              }
             });
          //  user1.friends.push(user2._id);
          //  user2.friends.push(user1._id);

    }
  }
  else {
    console.log(err);
  }
  });
  console.log("friendship created sucessfuly");

}



async function main() {
  dropDB();
  let users = await createUsers();
  createFriends(users);
  fs.writeFileSync(__dirname + "/userinfo.txt", util.inspect(usersForWriting));

}

main();

