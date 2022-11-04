const faker = require('faker')
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
            image: faker.image.imageUrl()
        })
        this.idContado++
        }
    }

    async create (data){
        this.products.push({
            id : this.idContado,
            ...data,
            image: faker.image.imageUrl()
        })
        this.idContado++
    }

    async find(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(true){
                    resolve(this.products)
                }
                else{
                    reject()
                }
            },2000)
        })
    }

    async findOne (id){
        let producto = this.products.find(produc => produc.id = id)
        return producto
    }

    async update(id, cambios){
        let index = this.products.findIndex(produc => produc.id == id);
        
        if(index === -1){
            throw new Error("El producto no existe")
        }
        else{
            let product = this.products[index]
            this.products[index] = {
                ...product,
                ...cambios
            }
        }
    }

    async delete(id){
        this.products = this.products.filter(produc => produc.id != id)
    }
}

module.exports = ProductsService