const express = require('express')

const path=require('path')
const hbs=require('hbs')
const geocode =require('./utils/geocode')
const forecast=require('./utils/weather')

console.log(__dirname);
console.log(path.join(__dirname,'../public'));
// Define path for Express config
const app = express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
// Set up handlrbars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Manav Kapur'
    })
})
app.get('/about',(req,res)=>{
 res.render('about',{
     title:'About me',
     name:'Manav Kapur'
 })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is example message',
        name:'Manav  Kapur'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error :'You must provide an address'
        })
    } 
    
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
          return res.send({
            error 
        })
          
        }
      forecast(longitude, latitude, (error, forecastData) => {
        if(error){
           return res.send({
            error 
        })
          
        }
       
       res.send({
      forecast:forecastData,
      location:location,
      address:req.query.address
    })
       
       
      })
      })
    
   
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
  return res.send({
       error:'You must provide a search term'
   })
    }

    console.log(req.query.search);
    
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        mesage:'Help article not found',
        name:'Manav Kapur'
    })
})
app.get('*',(req,res)=>{
res.render('error',{
    title:'404',
    message:'Page not found',
    name:'Manav Kapur'
})
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
    
})