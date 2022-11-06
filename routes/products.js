const express = require('express')
const ProductsService = require('../services/product.services')
const router = express.Router()

const service = new ProductsService();
const valodatorHandler = require('../middleware/validatos.handler.js')
const {createProductSchema, updateProductSchema, getProductScheme} = require('../schemas/product.schemas.js');
const { tr } = require('faker/lib/locales');

router.get('/', async function(req,res, next){
    try{
        const products = await service.find()
        res.json(products) 
    }
    catch(error){
        next(error)
    }
})

router.get('/:id',
    valodatorHandler(getProductScheme, 'params'),
    async (req,res, next)=>{
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
    let response = await service.create(data)
    res.status(201).json(response)
    }
)

router.patch('/:id',
    valodatorHandler(getProductScheme, 'params'),
    valodatorHandler(updateProductSchema, 'body')
    ,async (req, res, next)=>{
        try{
        let {id} = req.params;
        let cambios = req.body
        let response = await service.update(id, cambios)
        res.json(response)
    }
    catch(error){
        next(error)
    }
})

router.delete('/delete/:id',
    valodatorHandler(getProductScheme, 'params'),
    async (req, res, next)=>{
    try{ 
        let {id} = req.params
        let response = await service.delete(id)
        res.json(response)
    }
    catch(error){
        next(error)
    }
})

module.exports = router