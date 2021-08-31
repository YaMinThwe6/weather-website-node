const request = require('request')

const forecast = (address,location,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=32588b61d17a64a3ba59d51886ad5e34&query=' + address
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error){
            callback("Unable to find location" , undefined)
        } else {
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