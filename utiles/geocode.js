const request = require('request');



const geoCode = (address, callback) => {

    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2V0YW4wMDciLCJhIjoiY2tjaGE3MnJyMHg0NzJ0cDB4ZGRuYmF3ZiJ9.mI_3gaGx1BayLmPOgIeSFw&limit=1';
    request({
        url: geoCodeURL,
        json: true
    }, (err, response) => {
        if (err) {
            callback('Unable to connect to the server.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the Location.Try another Search!', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }

    });
}

module.exports = geoCode;