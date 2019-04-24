
var assert = require('assert');
var shutterDAO = require('../shutterDAO');


describe('Required material calculation test', function(){
    it('validating with precalculated data',function(){
        assert.deepStrictEqual(shutterDAO.getRequiredMaterials("Steel", "100", "100",callback=>{}),
            {"material" : "steel", "noOfStaves" : 6, "ofWidth" :  105, "ofLength" :  10, "fixtures":  1})
    })
});

describe('Testing acceptable order format', function(){
    it('check if good request is accepted',function(){
        var order = {order: {
            customerId: "2",
            contactEmail:"yolo",
            address:"swag",
            order: [{
                    shutterType: "wooden",
                    windowHeight: "1564",
                    windowWidth:"1",
                    windowType:"basic",
                    orderedPieces:"1",
                    isJobFinished:"false"
                },
                {
                    shutterType: "wooden2",
                    windowHeight: "1",
                    windowWidth:"1",
                    windowType:"nuub",
                    orderedPieces:"1",
                    isJobFinished:"false"
                }],
        }};
        assert.strictEqual(shutterDAO.isOrderValid(order),true)
    })
});


describe('Testing unacceptable order format (missing orderitems)', function(){
    it('check if bad request is denied',function(){
        var order = {order: {
                customerId: "2",
                contactEmail:"yolo",
                address:"swag",
                order: [{
                    shutterType: "",
                    windowHeight: "1564",
                    windowWidth:"1",
                    windowType:"basic",
                    orderedPieces:"1",
                    isJobFinished:"false"
                },
                    {
                        shutterType: "wooden2",
                        windowHeight: "1",
                        windowWidth:"",
                        windowType:"nuub",
                        orderedPieces:"1",
                        isJobFinished:"false"
                    }],
            }};
        assert.strictEqual(shutterDAO.isOrderValid(order),false)
    })
});


describe('Testing unacceptable order format (missing customerId)', function(){
    it('check if bad request is denied',function(){
        var order = {order: {
                contactEmail:"yolo",
                address:"swag",
                order: [{
                    shutterType: "",
                    windowHeight: "1564",
                    windowWidth:"1",
                    windowType:"basic",
                    orderedPieces:"1",
                    isJobFinished:"false"
                },
                    {
                        shutterType: "wooden2",
                        windowHeight: "1",
                        windowWidth:"",
                        windowType:"nuub",
                        orderedPieces:"1",
                        isJobFinished:"false"
                    }],
            }};
        assert.strictEqual(shutterDAO.isOrderValid(order),false)
    })
});
