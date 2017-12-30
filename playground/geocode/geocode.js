const request = require('request');

const geocode = require('./gecode/geocode.js');


var geocodeAddress = (address, callback) => {

// variable to capture user address and encoded it for the browsers
var encodedAddress = encodeURIComponent(address);

// requesting from google api and inputing users address(encoded address)
request({
  url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
if (error) {
  callback("Unable to connect to google server");
} else if (body.status === "ZERO_RESULTS") {
  callback("Unable to find that Address");
} else if (body.status === "OK") {
  callback(undefined, {
    address:body.results[0].formatted_address,
    latitude: body.results[0].geometry.location.lat,
    longitude: body.results[0].geometry.location.lng
  });
}
});
};

module.exports.geocodeAddress = geocodeAddress;


// api key from darksky ::5b2003ec7a924cdf1abb1d1bc5c73ddd

// in terminal you can run node app.js -a 'address'
// address example '715 morgan street gary' No zip codes
