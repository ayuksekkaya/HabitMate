const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'mapquest',
  apiKey: 'PlRc7c4YrynX774NiTpsvryIIpoy97tO', 
  formatter: null 
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
