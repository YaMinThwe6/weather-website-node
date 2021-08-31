const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(path.join(__dirname, '../public'))

const app = express()
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname , '../public')))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ya Min Thwe'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About me',
        name:'Ya Min Thwe'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help',
        name:'Ya Min Thwe',
        example:'This is an example help message.' 
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    
    geocode(req.query.address,(error,{latlon,placeName}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latlon, placeName, (error, info) => {
            if (error){
                return res.send({error})
            }
            res.send({info})
        })
    })
    // const address = req.query.address
    // res.send({
    //     forecast: 'It is 27 degree right now.',
    //     address
    // })
})

app.get('/help/*', (req,res)=>{
    res.render('404pages', {
        title:'404 page',
        name:'Ya Min Thwe',
        message:'Help article not found!'
    })
})

app.get('*', (req,res)=>{
    res.render('404pages', {
        title:'404 page',
        name:'Ya Min Thwe',
        message:'Page not found!'
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000.")
})