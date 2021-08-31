const request = require('request')

const geocode = (address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFtaW50aHdlIiwiYSI6ImNrc2gyOHhsNDFxMzEydnFrZzI2ZTRya20ifQ.FOwVgtdFEq6bA6V5kZSTbQ&limit=1'
    request({ url, json:true }, (error,{body}={}) => {
        if (error) {
            callback("Unable to connect to location service!", undefined)
        } else if (body.features.length===0) {
            callback("Unable to find location!", undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const place = body.features[0].place_name
            callback(undefined,{
                latlon : latitude + "," + longitude,
                placeName : place
            })
        }    
    })
}

module.exports = geocode