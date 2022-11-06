const productsRouter = require('./products.js')
const usersRouter = require('./users.js')
function routerApi(app){
    app.use('/products', productsRouter)
    app.use('/users', usersRouter)
}

module.exports = routerApi;