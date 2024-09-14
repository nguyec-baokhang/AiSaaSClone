const {constants} = require('../constants');

const errorHandler = (err,req,res,next) => {
    const status = (res.statusCode ? res.statusCode: 500);
    switch(status){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Fobidden",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No error");
            break;
    }
}

module.exports = errorHandler;