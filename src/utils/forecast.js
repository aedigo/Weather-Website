const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/73cfbf9f74cd3ad7de8d2935eb0fb635/' + latitude + ',' + longitude

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      return callback('Unable to find location', undefined)
    } else {
      return callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. The win speed is ' + body.currently.windSpeed + '!')
    }
  })
}

module.exports = forecast
