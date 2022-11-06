const express = require('express')
const router = express.Router()

router.get('/users', function(req,res){
    const {limit, offset} = req.query
    if(limit && offset){
        res.json({limit:limit,
            offset:offset})
    }
    else{
        res.send("No me enviaste todos los paremtroos papa")
    }
})

module.exports = router