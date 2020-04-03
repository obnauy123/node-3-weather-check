const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const requset = require('request')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
// define path
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')



// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Bo'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Bo'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Bo',
        title:'Help',
        helpText:'helping'

    })
})
app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'must provide a search here',
            
        })
    }
    res.send({

        products: []
    })
    
    
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'must provide an address'
        })
    }
    

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
           
        }
        
        
        weather(latitude, longitude, (error,data1)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                address: req.query.address,
                location,
                forecast: data1
            })   
            
        })
        
    
    })


    
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*',(req,res)=>{
    res.render('help',{
        name:'Bo',
        title:'Help',
        helpText:'helping'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'BO'
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})


