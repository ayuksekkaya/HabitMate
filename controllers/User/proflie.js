const User = require("../../Models/user");

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
          res.render("user/searchresults", {results: users});
        }
      }
    );
  },
};

module.exports = UserMethods;
