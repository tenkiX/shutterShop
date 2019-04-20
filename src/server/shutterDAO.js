/* MongoDB Related Code */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'shuttershop';
const collectionName = 'orders';
// Create a new MongoClient

/* Mongo DB Ends*/

function readOrders(findParams, callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection= db.collection(collectionName);

        collection.find(findParams).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs)
        });
        client.close();
    })
}

function readAllOrders(callback){
    readOrders({},(result) => {callback(result)})
}

function readOrdersByCustomerId(customerId,callback){
    readOrders({"order.customerId" : customerId},(result) => {callback(result)})
}

function createRequest(request,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        //console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection= db.collection(collectionName);

        collection.insertOne(request,(err,r)=>{
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            client.close();
            callback()
        })
    })
}

function calculateRequiredMaterials(height,width){
    return height*width;
}

function isOrderValid(req){
    if(req['order'] === undefined){
        //  res.status(411).send("Order must be defined");
        return false;
    }
    if(req['order']['customerId'] === undefined || req['order']['customerId'] === ""){
        //   res.status(412).send("Order-CustomerId must be defined");
        return false;
    }
    if(req['order']['order'] === undefined || req['order']['order'] === ""){
        //  res.status(413).send("Shutter type must be defined");
        return false;
    }

    return true;
}

module.exports = {
    "isOrderValid" : isOrderValid,
    "createRequest" : createRequest,
    "listAllOrders" : readAllOrders,
    "listOrdersByCustomerId" : readOrdersByCustomerId,
    "calculateRequiredMaterials" :calculateRequiredMaterials
};