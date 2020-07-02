const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=fbb207fddc361a25cbd00df84030d7ad&query=${latitude},${longitude}&units=s`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      console.log(body.current);
      callback(
        undefined,
        `${body.current.weather_descriptions}, It is currently ${body.current.temperature} ans feels like ${body.current.feelslike}
        wind speed is ${body.current.wind_speed}
        `
      );
    }
  });
};

module.exports = forecast;
