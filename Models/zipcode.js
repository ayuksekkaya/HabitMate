/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const geocoder = require('../utils/geocoder');


const ZipcodeSchema = new mongoose.Schema({

  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],


  location: {
      type: {
        type: String, 
        enum: ['Point'], 
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    },
    formattedAdress: String

});

ZipcodeSchema.pre('save', async function(next)  {
  console.log(this.address);
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
};

});

module.exports = mongoose.model('Zipcode', ZipcodeSchema);