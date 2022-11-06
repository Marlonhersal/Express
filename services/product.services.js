const faker = require('faker')
const boom  =require('@hapi/boom')

class ProductsService {
    constructor(){
        this.idContado = 0;
        this.products = [];
        this.generate();
    }
    async generate(){
        for(let i = 0; i < 10; i++){
        this.products.push({
            id : this.idContado,
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(),10),
            image: faker.image.imageUrl(),
            isBlock : faker.datatype.boolean()
        })
        this.idContado++
        }
    }
    async find(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(true){
                    resolve(this.products)
                }
                else{
                    reject(boom.notFound("No se pudo acceder a los productos"))
                }
            },1000)
        })
    }

    
    async findOne (id){
        let producto = this.products.find(produc => produc.id == id)
        if(!producto){
            throw boom.notFound("Producto no encontrado")
        }
        if(producto.isBlock){
            throw boom.locked("Producto no diponible")
        }
        return producto
    }
    
    async create (data){
        this.products.push({
            id : this.idContado,
            ...data,
            image: faker.image.imageUrl(),
            isBlock : faker.datatype.boolean()
        })
        this.idContado++
        return this.products
    }


    async update(id, cambios){
        let index = this.products.findIndex(produc => produc.id == id);
        if(index === -1){
            throw boom.notFound('El producto que quieres modificar no existe')
        }
        if(this.products[index].isBlock){
            throw boom.locked('El producto que quieres modificar está bloqueado')
        }
        else{
            let product = this.products[index]
            this.products[index] = {
                ...product,
                ...cambios
            }
            return this.products
        }
    }

    async delete(id){
        let index = this.products.findIndex(produc => produc.id == id);
        if(index === -1){
            throw boom.notFound('El elemento no existe')
        }
        this.products = this.products.filter(produc => produc.id != id)
        return this.products
    }
}

module.exports = ProductsService