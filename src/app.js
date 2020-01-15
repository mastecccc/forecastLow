const path  = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Andrew'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew'
    });
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Andrew'
    });
})


app.get('/weather', ({query}, res) => {

    if(!query.address) {
        return res.send({
            error: 'You must provide a search address'
        })
 }

 geocode.geocode(query.address, (error, {latitude, longitude, location }) => {

    if(error) {
        return res.send(error);
   }
       forecast.forecast(latitude, longitude, (error, forecastData) => {
           if(error) {
                 return res.send(error);
           }
               res.send({
                forecast: forecastData.forecast,
                temppeature: forecastData.temperature,
                location,
                address: query.address

    });
})

})
    // res.send({
    //     title: 'Weather Page',
    //     forecast: "Weather Af",
    //     location: "Dublin",
    //     address: req.query.address
    // });
})

app.get('/products', (req, res) => {
    console.log(req.query);
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
        
    } 
        res.send({
            products: []
        })
    

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error not Found'
    })
})

app.listen(port, () => {
    console.log('server is up af' + port);
});