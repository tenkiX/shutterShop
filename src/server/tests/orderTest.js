
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
                shutterType: "wooden",
                windowHeight: "10",
                windowWidth:"10"
        }};
        assert.strictEqual(shutterDAO.isOrderValid(order),true)
    })
});


describe('Testing unacceptable order format', function(){
    it('check if bad request is denied',function(){
        var order = {order: {
                shutterType: "i am evil",
                windowWidth:"some parts are undefined"
            }};
        assert.strictEqual(shutterDAO.isOrderValid(order),false)
    })
});
