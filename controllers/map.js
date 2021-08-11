/* eslint-disable no-unused-vars */
const zipcode = require("../Models/zipcode");

const MapMethods = {
  addAddress: async function (req, res) {
    console.log(req.body);
    zipcode.create(req.body, function (err, created) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send("success");
      }
    });
  },

  getAddress: async function (req, res) {
    let locations = await zipcode.find({});
    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  },
};

module.exports = MapMethods;
