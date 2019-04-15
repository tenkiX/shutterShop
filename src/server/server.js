var express = require('express');
var app = express();
const port = 8090;
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

const studentRequestController = require('./shutterController');
app.use('/',studentRequestController);

app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
});

