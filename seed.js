const User = require('./Models/user');
const Activity = require('./Models/activity');
const mongoose = require('mongoose');
const faker = require('faker');


function dropDB() {

//Check if collections exist. Drop if they do.
mongoose.connect("mongodb://localhost/auth_demo", { useNewUrlParser: true , useUnifiedTopology: true });
var db = mongoose.connection;
db.once('open', (err, res) => {


    mongoose.connection.db.listCollections().toArray(function (err, names) {
        // console.log(names); // [{ name: 'dbname.myCollection' }]
        if (names.length > 1) {
            console.log("db connect");
            db.dropCollection('users', (err, res) => {
                if (err){
                    console.log(err);
                }else {
                    console.log("DB dropped sucessfully");
                }
            })
        }
        else {
            console.log("no collections to drop");
        }
    });
})
}


function createUsers() {
    var usersAdded  = new Array();

    return new Promise(resolve => {
    for (let i = 0; i<20; i++) {
       User.register( new User( 
            {
                username: faker.internet.userName(),
                name: faker.name.firstName() + " " + faker.name.lastName(),
                zipcode: faker.address.zipCode(),
                friends: []
            }
        ), faker.internet.password(), (err, user) => {

            if (err){
                console.log(err)
            }
            else {
                usersAdded.push(user);
            }
        }
        )
    };

    resolve(usersAdded);
});

}

async function main() {
    dropDB();
    let x = await createUsers();
    return x;
}

const returnedVal = main();

returnedVal.then((x) => console.log(x.length));

// module.exports = main;

