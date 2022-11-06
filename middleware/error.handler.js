
function boomErrorHandler(error, req, res, next){
    console.log("First Midelware")
    if(error.isBoom){
        const {output} = error
        res.status(output.statusCode).json(output.payload)
    }
    else{
        next(error)
    }
}

function errorHandler(error, req, res, next){
    console.log("falló")
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
}


module.exports = { errorHandler, boomErrorHandler}