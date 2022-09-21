const request = require("request")
const express = require("express")
const { render } = require("pug")
const path = require('path');
const app = express()
require('dotenv').config()
const HTMLWebpackPlugin = require('html-webpack-plugin');
console.log(process.env)
const port = 3000

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


app.get('/sendWeatherAPI', (req, res) =>{
let options = {
	'method' : 'GET',
	'url' : 'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=329548&apikey=vlH3CfoiAjBiNguHPE5kqSMwpTtvuENf'
};
	request(options, function (error, response){
	if(error) throw new Error(error);
	console.log(response.body);
	let weatherResponse = JSON.parse(response.body);
	let weather = weatherResponse[0].WeatherText;
	let temp = weatherResponse[0].Temperature.Imperial.Value;
	let tempUnit = weatherResponse[0].Temperature.Imperial.Unit;
	let timestamp = weatherResponse[0].LocalObservationDateTime;
	let year = timestamp.substring(0,4);
	let month = timestamp.substring(5,7);
	let day = timestamp.substring(8,11);
	let date = year + "-" + month + "-" + day;
	console.log(weatherResponse)
	res.render('weather', {title: 'Weather App', city: "Jersey City, United States", weather:weather,temp:temp,tempUnit:tempUnit,timestamp:timestamp})


	});

});

app.get('/', (req, res)=> {
res.render('index', {title: 'Weather App', city: "Jersey City, United States"})

});

app.listen(port, () => {
	console.log(`Weather app listening at http://localhosts:${port}`)
})

