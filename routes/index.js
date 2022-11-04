const productsRouter = require('./products.js')
function routerApi(app){
    app.use('/products', productsRouter)
}

module.exports = routerApi;