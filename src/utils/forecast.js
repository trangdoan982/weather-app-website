const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2c2f1b9cc48b832afcce9c31e2fe27ac&query=" + encodeURIComponent(lon) + ","+ encodeURIComponent(lat) + "&units=f"
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Network Issue', undefined)
        } else if (body.error) {
            callback("Other issue", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ ". The temperature now is " + 
                body.current.temperature + " but it feels like " + body.current.feelslike + " degree out"
            )
        }
    })
}



module.exports = forecast