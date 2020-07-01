const request = require('postman-request');

const geocode = (adress, callback) => {
  const url = ` https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoiamVzc2VjaGEyMjIiLCJhIjoiY2tidmpjOHMxMDZpbjJ6cWRzZjlvYWVlNyJ9.hurIyzF2tY71hU6zLzxmvA&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

// geocode('New York', (err, data) => {
//   console.log('Error', err);
//   console.log('Data', data);
// });

module.exports = geocode;
