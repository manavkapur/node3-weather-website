const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url ='https://api.darksky.net/forecast/5d00a08a06e1b1cef21cb91a4f264e99/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,{body})=>{

        if(error)
    callback('Not able to connect to services ',undefined);
    else if(body.error)
        callback('Unable to find location .Try another location',undefined);
        else
        {    const {temperature,precipProbability} =body.currently

             callback(undefined,{
            
            temperature:temperature,
            rain:precipProbability,
            place:body.timezone
        })
        }
        
    
    })
    
    

}
module.exports=forecast