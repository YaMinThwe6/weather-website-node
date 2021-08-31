const request = require('request')

const forecast = (address,location,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=32588b61d17a64a3ba59d51886ad5e34&query=' + address
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error){
            callback("Unable to find location" , undefined)
        } else {
            // const forecast1 ="Today's weather in " + location + " is " + body.current.weather_descriptions[0].toLowerCase() + ". It is currently " + body.current.temperature + " degrees out."
            // const timeDate = " The Date and Time as per the timezone at " + body.location.timezone_id + " is " + body.location.localtime
            // if (body.current.temperature!=body.current.feelslike) {
            //     const forecast2 = " But it feels like " + body.current.feelslike + " degrees out."
            //     const forecast3 = forecast1.concat(forecast2).concat(timeDate)
            //     return callback(undefined, forecast3)
            // }
            
            // const forecast3 = forecast1.concat(timeDate)
            // callback(undefined, forecast3)
            const weatherDescription = body.current.weather_descriptions[0].toLowerCase()
            const temp = body.current.temperature
            const timeDate = body.location.localtime
            const timezone = body.location.timezone_id
            const feelsLike = body.current.feelslike
            const forecast3 = {location, weatherDescription, Temp:temp, DateTime:timeDate, TimeZone:timezone, FeelsLikeTemp:feelsLike}
            callback(undefined, forecast3)
            
        }    
    })

}

module.exports=forecast