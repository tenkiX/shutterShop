
function ShutterRequestService(studentRequestDAO){

    winston = require('winston')
    md5 = require('md5.js')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });
    if(studentRequestDAO != undefined && studentRequestDAO != null){
        this.orderRequestDAO = studentRequestDAO;
    }
    else {
        this.orderRequestDAO = require('./shutterRequestDAO')
    }
}



ShutterRequestService.prototype.listRequests = function(callback){
    this.orderRequestDAO.readRequests((requests) => {
        logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}

ShutterRequestService.prototype.listRequestsOfOrder = function(studentId, callback){
    this.orderRequestDAO.readRequestsOfStudent(studentId, (requests) =>{
        logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}

ShutterRequestService.prototype.listCommentableRequests = function(){
    //TODO Implement
}

ShutterRequestService.prototype.listReady2VerdictRequests = function(){
    //TODO Implement
}

ShutterRequestService.prototype.submitRequest = function(request, success, error){
    request['date'] = new Date().toISOString()
    request['sign'] = new md5().update(JSON.stringify({
        order: request['order'],
        date : request['date']})).digest('hex')
    this.orderRequestDAO.createRequest(request, ()=>{success()})
}

module.exports = ShutterRequestService;