const request = require('request');

const foreCast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + myKey + '/' + latitude + ',' + longitude + '?units=si';
    request({
        url,
        json: true
    }, (err, response) => {
        if (err) {
            callback('Unable to connect to the server.', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location.Try another Search', undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary + "It is currently " + response.body.currently.temperature + ' degress out. There is ' + response.body.currently.precipProbability + ' % chance of rain');
        }

    });
}




module.exports = foreCast;