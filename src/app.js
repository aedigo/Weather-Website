const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectory));

hbs.registerPartials(partialPath);

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provide!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, clime) => {
      if (error) {
        return res.send({
          error,
        });
      }

      return res.send({
        forecast: clime,
        location,
        address: req.query.address,
      });
    })
  });
});

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    body: 'Is raining men!',
    createdBy: 'Rodrigo Soares',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    body: 'I\'m Felling Awesome',
    createdBy: 'Rodrigo Soares'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    body: 'I\'m ready!',
    createdBy: 'Rodrigo Soares'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found',
    createdBy: 'Rodrigo\'s'
  });
});


app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found',
    createdBy: 'Rodrigo\'s'
  })
});

app.listen(port);
