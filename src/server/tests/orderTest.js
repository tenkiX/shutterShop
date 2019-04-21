
var assert = require('assert');
var shutterDAO = require('../shutterDAO');


describe('Required material calculation test', function(){
    it('check if required mats for a 200x200 window = 40000',function(){
        assert.strictEqual(shutterDAO.calculateRequiredMaterials(200,200),40000)
    })
});

describe('Testing acceptable order format', function(){
    it('check if good request is accepted',function(){
        var order = {order: {
            customerId: "2",
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
