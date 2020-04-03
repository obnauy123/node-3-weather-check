console.log('client side js loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
            messagetwo.textContent = ''
        }
         
        else {
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
            
        }
    })
})


})