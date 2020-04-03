const request = require('request')
const weather = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/6afcc73e309f54cb41f9f2daffc5ea24/'+ longitude + ',' + latitude+ '?units=si'
    request({url: url, json: true},(error,{body}=response)=>{
        if(error){
            callback(error,undefined)
        }else if(body.error){
            callback('no location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently '+body.currently.temperature + ' degrees of celcius out. '+'There is '+ body.currently.precipProbability + ' % chance of rain.')
        }


    })
}

module.exports = weather