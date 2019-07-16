
const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const bodyParser = require('body-parser');

const port = 8000;
const path = require('path');
const description = 'http://localhost:3000',
      reservation = 'http://localhost:3001';   
      photo = 'http://localhost:3002';
      
      
app.use(bodyParser.json());
app.use('/listing/:listingID',express.static(path.resolve(__dirname,"../public")))
console.log(__dirname)

app.all("/listing/:listingID/*",(req,res)=>{
    console.log('redirecting to Server Listing')
    apiProxy.web(req,res, {target: description});
});

app.all("/listing/:listingID",(req,res)=>{
    console.log('redirecting to Server Reservation')
    apiProxy.web(req,res, {target: reservation});
});

app.all("/api/listings/photos/:listingID/",(req,res)=>{
    console.log('redirecting to Server PhotoCarousel')
    apiProxy.web(req,res, {target: photo});
});
app.listen(port, () => console.log(`Listening on port ${port}!`));
