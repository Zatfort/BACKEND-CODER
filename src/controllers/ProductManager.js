import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () =>{
        const products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)

    }


    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) =>{
        const products = await this.readProducts()
        return products.find(prod => prod.id === id)

    }


    addProducts = async (product) => {
        const productsOld = await this.readProducts()
        product.id = nanoid(1)
        const productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "producto agregado"
    }

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductsById = async (id) => {
       const productById = await this.exist(id)
       if(!productById) return "producto no encontrado"
       return productById
    }

    

    updateProducts = async (id,product) => {
        const productById = await this.exist(id)
        if(!productById) return "producto no encontrado"
        await this.deleteProducts(id)
        const productOLd = await this.readProducts()
          
        const products = [{...product, id : id}, ...productOLd ]
        await this.writeProducts(products)
        return "producto actualizado"




    } 

    deleteProducts = async (id) => {
        const products = await this.readProducts()
        const productsExists = products.some(prod => prod.id === id)
        if(productsExists){
            const filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "producto eliminado"
        }
        return "el producto a eliminar no existe" 

    }

}

export default ProductManager


