/* MongoDB Related Code */
var ObjectId = require('mongodb').ObjectId;

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

function updateJobStatus(orderid,index,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(collectionName);
        const query =   { _id: ObjectId(orderid) };
        const setter = {["order.order."+index+".isJobFinished"]:"true"};
        collection.updateOne(query,{$set:setter}, (err,r)=> {
                if (err) console.log(err);
            callback();
            client.close();
            });
    })
}

function readOrdersByCustomerId(customerId,callback){
    readOrders({"order.customerId" : customerId},(result) => {callback(result)})
}

function getStatistics(shutterType,callback){
    getNumOfDocs({"order.order.shutterType" : shutterType},(err, result) => {callback(result)})
}

function getNumOfDocs ( findParams, callback) {
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection= db.collection(collectionName);

        collection.count(findParams, function(error, numOfDocs){
            if(error) return callback(error);
            client.close();
            callback(null, numOfDocs);
        });
    });
}

function createRequest(request,callback){
    var client = new MongoClient(url);
    client.connect((err)=>{
        assert.equal(null, err);

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



function calculateRequiredMaterials(shutterType, windowWidth, windowHeight,callback){

    var materials = {"material" : shutterType.toLowerCase(),"noOfStaves" : Math.ceil(windowHeight/18), "ofWidth" :  Math.ceil(windowWidth*1.05), "ofLength" :  Math.ceil(windowHeight/11), "fixtures":  Math.ceil(windowHeight/100)};
    callback(materials);
    return materials; //for tests
}

function isOrderValid(req){
    var test = JSON.stringify(req);
    var obj = JSON.parse(test);
    var testVal = obj.order;

    if(testVal === undefined){
        console.log("request body is missing");
        return false;
    }
    if(testVal.customerId === undefined || testVal.customerId === ""){
        console.log("customerId not defined");
        return false;
    }
    if(testVal.contactEmail === undefined || testVal.contactEmail === "" || testVal.address === undefined || testVal.address === "") {
        console.log("customer contact data not defined");
        return false;
    }

    for (var i = 0; i < testVal.order.length; i++) {
        if(testVal.order[i].shutterType === undefined || testVal.order[i].shutterType === ""
            || testVal.order[i].windowHeight === undefined || testVal.order[i].windowHeight === ""
            || testVal.order[i].windowWidth === undefined || testVal.order[i].windowWidth === ""
            || testVal.order[i].windowType === undefined || testVal.order[i].windowType === ""
            || testVal.order[i].orderedPieces === undefined || testVal.order[i].orderedPieces === ""
            || testVal.order[i].isJobFinished !== 'false' ){
            console.log("order is not correctly defined");
            return false;
        }
    }


    return true;
}

module.exports = {
    "isOrderValid" : isOrderValid,
    "createRequest" : createRequest,
    "listAllOrders" : readAllOrders,
    "listOrdersByCustomerId" : readOrdersByCustomerId,
    "finishJob" : updateJobStatus,
    "getRequiredMaterials" : calculateRequiredMaterials,
    "getStatistics" : getStatistics
};