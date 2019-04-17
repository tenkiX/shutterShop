var express = require('express');
var router = express.Router();

var srs = require('./shutterService');
const shutterService = new srs();

//customerId alapjan
router.get('/listOrders/:customerId',(req,res) =>{
    shutterService.listOrdersByCustomerId(req.params.customerId, (requests)=>{
        res.status(200).send(requests)
})});

//mindet
router.get('/listOrders',(req,res) =>{
    shutterService.listAllOrders((requests) =>{
        res.status(200).send(requests)
})});


router.post('/placeOrder', (req,res) =>{
    if(req.body['order'] === undefined){
        res.status(411).send("Order must be defined");
        return;
    }
    if(req.body['order']['customerId'] === undefined || req.body['order']['customerId'] === ""){
        res.status(412).send("Order-CustomerId must be defined");
        return;
    }
    if(req.body['order']['shutterType'] === undefined || req.body['order']['shutterType'] === ""){
        res.status(413).send("Shutter type must be defined");
        return;
    }
    if(req.body['order']['windowHeight'] === undefined || req.body['order']['windowHeight'] === ""){
        res.status(414).send("Window height must be defined");
        return;
    }
    if(req.body['order']['windowWidth'] === undefined || req.body['order']['windowWidth'] === ""){
        res.status(415).send("window width must be defined");
        return;
    }
    shutterService.submitRequest(
        {order : req.body['order']},
        () => {res.status(200).send("Request recorded")},
        (cause) => {res.status(400).send(cause)}
        )
});

module.exports = router;