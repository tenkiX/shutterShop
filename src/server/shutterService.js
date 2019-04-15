
function ShutterService(shutterRequestDAO){

    winston = require('winston');
    md5 = require('md5.js');
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });
    if(shutterRequestDAO !== undefined && shutterRequestDAO != null){
        this.shutterDAO = shutterRequestDAO;
    }
    else {
        this.shutterDAO = require('./shutterDAO')
    }
}



ShutterService.prototype.listAllOrders = function(callback){
    this.shutterDAO.listAllOrders((requests) => {
        logger.info(`${requests.length} orders were found!`);
        callback(requests)
    })
};


ShutterService.prototype.listOrdersByCustomerId = function(userId, callback){
    console.log("service passed");
    this.shutterDAO.listOrdersByCustomerId(userId, (requests) =>{
        logger.info(`${requests.length} orders were found!`);
        callback(requests)
    })
};


ShutterService.prototype.submitRequest = function(request, success, error){
    request['date'] = new Date().toISOString();
    request['sign'] = new md5().update(JSON.stringify({
        order: request['order'],
        date : request['date']})).digest('hex');
    this.shutterDAO.createRequest(request, ()=>{success()})
};

module.exports = ShutterService;