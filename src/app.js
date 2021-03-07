const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Trang Doan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Trang Doan',
        message: "Call 911 if you need help"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Trang Doan'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send("You must provide an address")
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({Error: error})
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({Error: error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Trang Doan',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Trang Doan',
        title: 'Error',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("server is up on port "+ port)
})