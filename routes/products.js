const express = require('express')
const ProductsService = require('../services/product.services')
const router = express.Router()

const service = new ProductsService();
const valodatorHandler = require('../middleware/validatos.handler.js')
const {createProductSchema, updateProductSchema, getProductScheme} = require('../schemas/product.schemas.js')

router.get('/', async function(req,res){
    const products = await service.find()
    res.json(products) 
})

router.get('/:id',
    valodatorHandler(getProductScheme, 'params') 
    ,async (req,res, next)=>{
    try{
        let {id} = req.params;
        const producto =  await service.findOne(id)
        res.json(producto)
    }
    catch(error){
        next(error)
    }
})

router.post("/",
    valodatorHandler(createProductSchema, 'body')
    , async (req, res)=>{
    const data = req.body
    await service.create(data)
    res.status(201).json(service.find())
    }
)

router.patch('/corregir/:id',
    valodatorHandler(updateProductSchema, 'body')
    ,async (req, res, next)=>{
        try{
        console.log("Este es el reques:", req)
        let {id} = req.params;
        let cambios = req.body
        await service.update(id, cambios)
        res.json(await service.find())
    }
    catch(error){
        next(error)
    }
})

router.delete('/delete/:id', async (req, res)=>{
    let {id} = req.params
    await service.delete(id)
    res.json(service.find())
})

module.exports = router