const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials'); //header and footer

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})//index page


app.get('/weather', (req, res) =>{ //localhost:3000/weather?address=city
	const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName, weatherImg, iconCode} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log("The Temperature is", (temperature - 273).toFixed(0), "°C, we have", description, "in" ,cityName);
        res.send({
            temperature,
            description,
            cityName,
						weatherImg,
						iconCode
        })
    })
});//fetch data weather 


app.get('*', (req, res) =>{
	   res.render('404', {
        title: "404 Page not found"
    })
})//static no page


app.listen(port, () => {
    console.log("El Servidor is up and running en el puerto: ", port);
})