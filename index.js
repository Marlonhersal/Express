const express = require('express');
const {errorHandler, boomErrorHandler} = require("./middleware/error.handler.js");
const routeApi = require('./routes');

const app = express()
const port = 3000;

app.use(express.json())

app.get('/', function(req,res){
    res.send('Esta es la API de una tienda Online')
})

routeApi(app);
app.use(boomErrorHandler)
app.use(errorHandler) 



app.listen(port, ()=>{
    console.log("Funciona")
})