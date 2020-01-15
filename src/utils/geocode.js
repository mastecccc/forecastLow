const request = require('request');

const geocode = (address, callback) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicXVpbm5hdGhlbjA5IiwiYSI6ImNrNWRpN2xyODF3eXczb24wNXJyamVlbHkifQ.YqXVBUKfaZkwkc9KB1LdVw&limit=1`
        request({url, json: true}, (error, {body})=>{
    
            if(error){
                callback("Unable to connect with weather service");
            } else if(body.error){
                callback("Unable to find location");
            } else {
                callback(null,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        
            
        })
}

module.exports = {
    geocode: geocode
}