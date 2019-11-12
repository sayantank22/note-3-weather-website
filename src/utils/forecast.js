const request = require('request')


// const forecast = (lat, long, callback) => {
//     const url = 'https://api.darksky.net/forecast/c069a6b21d1bec73c6c843510d968695/'+ lat + ',' + long + '?units=us&lang=en'
    
//     request({ url: url, json: true }, (error, response) => {
//         if(error){
//             callback('Unable to connect to weather service!', undefined)
//         }else if(response.body.error){
//             callback('Unable to find loaction, please check the given url', undefined)
//         }else{
//             callback(undefined, response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature+" degrees here. There is "+response.body.currently.precipProbability + "% chance of rain")
//         }
//     })
// }

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c069a6b21d1bec73c6c843510d968695/'+ lat + ',' + long + '?units=us&lang=en'
    
    // since the name of the object property(url) and name of the variable(url) is same we can use the es-6 shorthand syntax
    request({ url, json: true }, (error, {body}) => {   // also since we are only  using the property 'body' of the object 'response' so we could just destructure that
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find loaction, please check the given url', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary +" It is currently " + body.currently.temperature+" degrees here. The high today is " + body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow +". There is "+body.currently.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast