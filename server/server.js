// Author = Nagarjuna Yadav K.
const express = require("express");
const bodyParser = require('body-parser');
//express router for products
const product = require("./routes/product");
// initialize our express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', product);
// UI static folder fix
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'build')));

//Access-Control-Allow-Origin
app.use((req, resp, next) => {
    resp.set('Access-Control-Allow-Origin', '*');
    resp.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    resp.set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    next();// it require////
});

//to Accept all requests of OPTIONS
app.options('/*', (req, resp) => {
    resp.end();
})

//== Test server Api
app.get('/ping', (req, resp) => {
    resp.json('Hey Server sucessfully Triggred.');
});

//=== Get port from environment and store in Express.
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log("REST Endpoint Server at port ======= ", port);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});