const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static derectory to use
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jesse CHA',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Jesse CHA',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Anything to help?',
    name: 'Jesse CHA',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'pleaese provide a fucking address',
    });
  }

  geocode(req.query.adress, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      res.send({ error: err });
    } else {
      forecast(latitude, longitude, (err, forecastInfo) => {
        if (err) {
          res.send({ error: err });
        } else {
          res.send({
            forecast: forecastInfo,
            location: location,
            address: req.query.adress,
          });
        }
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must search something',
    });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    text: 'help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    text: 'page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port${port}`);
});
