const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F5YW50YW5rMjIiLCJhIjoiY2syNHJjNWpoMml2eTNocGlwdmxmdTFqcyJ9.TQuPD-UgavjhS_SeEdUtSA&limit=1'

//     request({ url: url, json: true }, (error, response) => {
//         if(error){
//             callback('Unable to connect to loacation services!', undefined)
//         }else if(response.body.features.length === 0){
//             callback('Unable to findlocation.Try another search.', undefined)
//         }else{
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],  // latitude comes second and longitude comes first inside the center[]
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F5YW50YW5rMjIiLCJhIjoiY2s5ZWoxc2F0MDJhNDNtdGJqdmdzYmN4cSJ9.xICKivbxTOfggB9Q1nPkHA&limit=1'
    
    // since the name of the object property(url) and name of the variable(url) is same we can use the es-6 shorthand syntax
    request({ url, json: true }, (error, {body} = {}) => { // also since we are only  using the property 'body' of the object 'response' so we could just destructure that
        if(error){
            callback('Unable to connect to loacation services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location.Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],  // latitude comes second and longitude comes first inside the center[]
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// Now we can easily call geocode more than one time to geocode from different places in our application.
// We have all of that sitting behind a single reusable fucntion which we can use as many times we need

// geocode('Kolkata', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = geocode
