import fs from 'fs'
import products from './mockData/products.js'

class ProductManager {
    #products
    path

    constructor() {    
        this.path = './products.json'
    }

    #generateID = (products) => {
        let id
        if (products.length === 0) id = 1
        else id = products[products.length-1].id + 1
        return id
    }

    #repeatedCode = (products, code) => products.filter((prod)=> prod.code === code).length > 0

    getProducts = (limit) => {
        let products = fs.readFileSync(this.path, 'utf-8')
        products = JSON.parse(products)
        if (limit) products = products.slice(0, limit)
        return products
    }
    
        
    initializeProducts = () => {
        fs.writeFileSync(this.path, JSON.stringify([], null, 4))
        products.map((product)=> {
            const {title, description, price, thumbnail, code, stock} = product
            this.addProduct(title, description, price, thumbnail, code, stock)
        })
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        // const { title, description, price, thumbnail, code, stock } = products
        let products = this.getProducts()
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Mandatory field/s missing.')
            return
        }

        if (this.#repeatedCode(products, code)){
            console.error('Code Repeated: ', code)
            return
        }
        
        let id = this.#generateID(products)
        let newProduct = {id, title, description, price, thumbnail, code, stock}

        products.push(newProduct)
        fs.writeFileSync(this.path, JSON.stringify(products, null, 4))
    }

    updateProduct = (id, fields) => {
        let products = this.getProducts()

        products.map((product) => {
            if (product.id === id){
                Object.keys(fields).map((key)=>{
                    product[key] = fields[key]
                    fs.writeFileSync(this.path, JSON.stringify(products, null, 4))
                    return
                })
                
            }
        })

    } 

    deleteProduct = (id) => {
        let products = this.getProducts()
        const otherProducts = products.filter((product) => product.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(otherProducts, null, 4)) 
    }

    getProductById = (id) => {
        let products = this.getProducts()
        return products.filter((product) => product.id === id)
    }
}

export default new ProductManager()

