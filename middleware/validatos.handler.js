const boom  = require('@hapi/boom')

function valodatorHandler(schema, propert){
    return function(req, res, next){
        const data = req[propert]
        const {error} = schema.validate(data);
        if(error){
            next(boom.badRequest(error))
        }
        next()
    }
}
module.exports = valodatorHandler