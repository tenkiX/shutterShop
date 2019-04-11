var express = require('express');
var router = express.Router();

var srs = require('./shutterRequestService')
const shutterRequestService = new srs()

router.get('/listOrders',(req,res) =>{
    if(req.query['studentId'] !== undefined){

        shutterRequestService.listRequestsOfOrder(req.query['studentId'], (requests)=>{
            res.status(200).send(requests)
        })
        return;
    }
    shutterRequestService.listRequests((requests) =>{
        res.status(200).send(requests)
    })
})

router.post('/placeOrder', (req,res) =>{
    if(req.body['order'] === undefined){
        res.status(414).send("Order must be defined");
        return;
    }
    if(req.body['order']['customerId'] === undefined || req.body['order']['customerId'] === ""){
        res.status(414).send("Order-CustomerId must be defined");
        return;
    }
    if(req.body['order']['shutterType'] === undefined || req.body['order']['shutterType'] === ""){
        res.status(414).send("Shutter type must be defined");
        return;
    }
    if(req.body['order']['windowHeight'] === undefined || req.body['order']['windowHeight'] === ""){
        res.status(414).send("Window height must be defined");
        return;
    }
    if(req.body['order']['windowWidth'] === undefined || req.body['order']['windowWidth'] === ""){
        res.status(414).send("window width must be defined");
        return;
    }
    shutterRequestService.submitRequest(
        {order : req.body['order']},
        () => {res.status(200).send("Request recorded")},
        (cause) => {res.status(400).send(cause)}
        )
})

module.exports = router;