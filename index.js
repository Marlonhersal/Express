const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000;
const routeApi = require('./routes')

app.use(express.json())

app.get('/', function(req,res){
    res.send('Hola mi server en express')
})



app.get('/users', function(req,res){
    const {limit, offset} = req.query
    if(limit && offset){
        res.json({limit:limit,
            offset:offset})
    }
    else{
        res.send("No me enviaste todos los paremtroos papa")
    }
})


routeApi(app)

app.listen(port, ()=>{
    console.log("Funciona")
})