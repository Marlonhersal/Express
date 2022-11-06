const express = require('express');
const {errorHandler, boomErrorHandler} = require("./middleware/error.handler.js");
const routeApi = require('./routes');
const cors = require('cors')

const app = express()
const port = process.env.port || 3000;

const whiteList = ['http://localhost:550', 'http://myapp.co']
const options = {
    origin: (origin, callback)=>{
        if(whiteList.includes(origin) || !origin)
        {
            callback(null, true)
        }
        else{
            callback(new Error('no permitido'))
        }
    }
}

app.use(express.json())
app.use(cors(options))

app.get('/', function(req,res){
    res.send('Esta es la API de una tienda Online')
})

routeApi(app);
app.use(boomErrorHandler)
app.use(errorHandler) 

app.listen(port, ()=>{
    console.log("Funciona")
})