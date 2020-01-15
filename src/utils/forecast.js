const request = require('request');

const forecast = (lat, long , callback) => {
    const url = `https://api.darksky.net/forecast/323d6adf0d0d7556201752124b430cae/${lat},${long}?units=si`;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Cannot connect to weather service");
        } else if(body.error) {
            // console.log(response.body);
            callback("Unable to find location");
        } else {
            callback(null, {
                forecast: body.daily.summary,
                timezone: body.timezone,
                temperature: body.currently.temperature
            });
        }
    })
}

module.exports = {
    forecast: forecast
}