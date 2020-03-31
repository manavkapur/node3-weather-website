

// fetch('http://localhost:3000/weather?address=jalandharbiyvuy').then((response) => {
//     response.json().then((data)=>{
        
//         console.log(data);
        
        
//     })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
// messageOne.textContent='from Javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =search.value
console.log(location);
messageOne.textContent='Loading'
messageTwo.textContent=''
fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
  response.json().then((data)=>{
      if(data.error)
      {
       messageOne.textContent=data.error 
       messageTwo.textContent=''
    }
      else{
          const forecastfor=JSON.stringify(data.forecast)
          const locationfor=JSON.stringify(data.location)
          messageOne.textContent=forecastfor
          messageTwo.textContent=locationfor
         
      }
      
  })
 })

})

