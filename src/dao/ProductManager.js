import fs from 'fs'
import productsJS from '../mockData/products.js'

class ProductManager {
    products_path
    initialize_path

    constructor() {    
        this.products_path = 'products.json'
        this.initialize_path= 'products_init.json'
    }

    #generateID = (products) => {
        let id
        if (products.length === 0) id = 1
        else id = products[products.length-1].id + 1
        return id
    }

    #repeatedCode = (products, code) => products.filter((prod)=> prod.code === code).length > 0

    getProducts = (limit) => {
        let products = fs.readFileSync(this.products_path)
        products = JSON.parse(products)
        if (limit) products = products.slice(0, limit)
        return products
    }
        
    initializeProducts = () => {

        let isInitialized = false;

        try {
            const data = fs.readFileSync(
                this.initialize_path,
            );
            const jsonData = JSON.parse(data);
            isInitialized = jsonData.isInitialized;
        } catch (error) {
            console.log('[ X ] Error al leer products_init.json:', error.message);
        }
        
        let message = ""

        if (!isInitialized) {
            
            try {
                fs.writeFileSync(this.products_path, JSON.stringify([], null, 4))
                productsJS.map((product)=> {
                    const {title, description, price, thumbnail, code, stock, status} = product
                    this.addProduct(title, description, price, thumbnail, code, stock, status)
                });
            } catch (error) {
                console.log('[ X ] Error al escribir products.json:', error.message);
            }

            isInitialized = true;

            try {
                fs.writeFileSync(
                    this.initialize_path,
                    JSON.stringify({ isInitialized }, null, 4),
                );
            } catch (error) {
                console.log('[ X ] Error al escribir products_init.json:', error.message);
            }

            message = '[ √ ] products initialized.'
        
        } else {
            
            message = '[ √ ] products already initialized.'

        }

        const products = this.getProducts()

        console.log(message, products)
    }

    #validationAddProduct = (title, description, price, code, stock, status, products) => {

        let errMessage = ""

        if (!title || !description || !price || !code || !stock || !status) {
            errMessage='[ X ] Error adding product - Validation failed: Mandatory field/s missing.'
        }
        
        if (this.#repeatedCode(products, code)){
            errMessage=`[ X ] Error adding product - Validation failed: Code Repeated: ${code}` 
        }
        
        if (errMessage === ""){
            return true
        }
        console.error(errMessage)
        return errMessage
    }

    addProduct = (title, description, price, thumbnail, code, stock, status) => {

        let products = this.getProducts()

        const validation = this.#validationAddProduct(title, description, price, code, stock, status, products)
        if ( validation !== true) return validation
        
        let id = this.#generateID(products);

        let newProduct = {id, title, description, price, thumbnail, code, stock, status};

        products.push(newProduct);

        fs.writeFileSync(
            this.products_path, 
            JSON.stringify(products, null, 4)
        );

        products = this.getProducts()
        
        console.log('[ √ ] products updated: ', products)

        return true
    }

    updateProduct = (id, fields) => {
        let updated = false
        let products = this.getProducts()
        products.map((product) => {
            if (product.id === id){
                Object.keys(fields).map((key)=>{
                    product[key] = fields[key]
                })
                fs.writeFileSync(this.products_path, JSON.stringify(products, null, 4))
                updated = true
            }
        })
        return updated
    } 

    deleteProduct = (id) => {
        let products = this.getProducts()
        const otherProducts = products.filter((product) => product.id !== id)
        if (otherProducts.length !== products.length){
            fs.writeFileSync(this.products_path, JSON.stringify(otherProducts, null, 4)) 
            return true
        }
        return false
    }

    getProductById = (id) => {
        let products = this.getProducts()
        return products.filter((product) => product.id === id)
    }
}

export default ProductManager

