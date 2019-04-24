
var express = require('express');
var router = express.Router();

var srs = require('./shutterService');
const shutterService = new srs();
var sd = require('./shutterDAO');

//customerId alapjan
router.get('/listOrders/:customerId',(req,res) =>{
    shutterService.listOrdersByCustomerId(req.params.customerId, (requests)=>{
        res.status(200).send(requests)
})});

//mindet
router.get('/listAllOrders',(req,res) =>{
    shutterService.listAllOrders((requests) =>{
        res.status(200).send(requests)
})});

//stats
router.get('/statistics/:shutterType',(req,res) =>{
    shutterService.getStatistics(req.params.shutterType, (requests) =>{
        res.status(200).send(requests.toString())
    })});

router.get('/getRequiredMaterials/:shutterType/:windowWidth/:windowHeight',(req,res) =>{
    shutterService.getRequiredMaterials(req.params.shutterType,req.params.windowWidth,req.params.windowHeight,(requests) =>{
        res.status(200).send(requests)
    })});

router.post('/placeOrder', (req,res) =>{
    if (!sd.isOrderValid(req.body)) {res.status(414).send("incorrect order format, ordering failed."); return;}
    shutterService.submitOrder(
        {order : req.body['order']},
        () => {res.status(200).send("Request recorded")},
        (cause) => {res.status(400).send(cause)}
        )
});

router.post('/finishJob/:jobId/:index', (req,res) =>{

    shutterService.finishJob(req.params.jobId,req.params.index,() => {res.status(200).send("Request recorded")})
});


module.exports = router;
