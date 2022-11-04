const express = require('express')
const ProductsService = require('../services/product.services')
const router = express.Router()

const service = new ProductsService();

router.get('/', async function(req,res){
    const products = await service.find()
    res.json(products)
})
router.get('/:id', async (req,res)=>{
    let {id} = req.params;
    const producto =  await service.findOne(id)
    res.json(producto)
})

router.post("/", async (req, res)=>{
    const data = req.body
    await service.create(data)
    res.status(201).json(service.find())
    }
)

router.patch('/corregir/:id', async (req,res)=>{
    try{

        let {id} = req.params;
        let cambios = req.body
        await service.update(id, cambios)
        res.json(service.find())
    }
    catch(error){
        res.status(404).json({mensaje:error.message})
    }
})

router.delete('/delete/:id', async (req, res)=>{
    let {id} = req.params
    await service.delete(id)
    res.json(service.find())
})

module.exports = router