const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require('body-parser');

const port = 8000;
const path = require('path');
const description = 'http://18.221.218.103';
const reservation = 'http://18.188.235.153';
const photo = 'http://3.14.5.145';
const review = 'http://13.57.195.146';

app.use(bodyParser.json());
app.use('/:listingID',express.static(path.resolve(__dirname,"../public")))

//desciption 
app.all("/listing/desc/:listingID",(req,res)=>{
    console.log('redirecting to Server Listing')
    apiProxy.web(req,res, {target: description});
});
app.all("/listing/amenity/:listingID",(req,res)=>{
    console.log('redirecting to Server Listing')
    apiProxy.web(req,res, {target: description});
});
//reservation
app.all('/listing/:listingID', (req, res) => {
    console.log('redirecting to calendar server');
    apiProxy.web(req, res, {target: reservation});
});
app.all('/custom/month/', (req, res) => {
    console.log('redirecting to calendar server');
    apiProxy.web(req, res, {target: reservation});
});
app.all('/reserved/month/', (req, res) => {
    console.log('redirecting to calendar server'); 
    apiProxy.web(req, res, {target: reservation});
});
//photo
app.all('/api/listings/photos/:listingID', (req, res) => {
    apiProxy.web(req, res, {target: photo});
});
  
app.all("/api/listings/photos/initial/:listingID", (req, res) => {
    apiProxy.web(req, res, {target: photo});
});

//review
app.all('/api/:listingID/reviews', (req, res) => {
    apiProxy.web(req, res, {target: review});
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
