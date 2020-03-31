const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaWduaXRlNyIsImEiOiJjazg3aTUzcDkwbW9rM25tbXp4aW4yZnVsIn0.wt6GklAaYkeXHGLTrJAFwA&limit=1'
  request({url,json:true},(error,{body}={})=>{
  if(error){
    callback('Unable to connect to location services',undefined)
  } else if(body.features.length===0){
  callback('Unable to find location.Try another search.',undefined)
  }else
  {  const {0:longitude,1:latitude }=body.features[0].center
    callback(undefined,{
      longitude:longitude,
      latitude:latitude,
      location:body.features[0].place_name
    })
  }
  })
  }
  
 
  module.exports=geocode