function placeOrder() {

    var orderObj = {order: {customerId: "3", shutterType: "supershutter", windowHeight: 31,windowWidth:52}};

    var orderJSON = JSON.stringify(orderObj);

    var request = new XMLHttpRequest();
    request.open('POST', '/placeOrder', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(orderJSON);
    alert("order placed!");
}

function getOrder() {

    httpGetAsync('/listOrders',onOrderArrived);

}

function getOrdersByUserId() {

    httpGetAsync('/listOrders/1',onOrderArrived);

}

function onOrderArrived(req,res){
    alert("you ordered:\n" + req);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}


