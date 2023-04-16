import fs from 'fs'
import cartsJS from '../mockData/carts.js'

class CartManager {
    carts_path
    initialize_path
    
    constructor() {    
        this.carts_path = 'carts.json'
        this.initialize_path= 'carts_init.json'
    }

    #generateID = (carts) => {
        let id
        if (carts.length === 0) id = 1
        else id = carts[carts.length-1].id + 1
        return id
    }

    getCarts = () => {
        let carts = fs.readFileSync(this.carts_path)
        carts = JSON.parse(carts)
        return carts
    }
    
    initializeCarts = () => {

        let isInitialized = false;

        try {
            const data = fs.readFileSync(
                this.initialize_path,
            );
            const jsonData = JSON.parse(data);
            isInitialized = jsonData.isInitialized;
        } catch (error) {
            console.log('[ X ] Error al leer carts_init.json:', error.message);
        }
        
        if (!isInitialized) {
            
            try {
                fs.writeFileSync(this.carts_path, JSON.stringify([], null, 4))
                cartsJS.map((cart)=> {
                    const {products} = cart
                    this.addCart(products)
                });
            } catch (error) {
                console.log('[ X ] Error al escribir carts.json:', error.message);
            }

            isInitialized = true;

            try {
                fs.writeFileSync(
                    this.initialize_path,
                    JSON.stringify({ isInitialized }, null, 4),
                );
            } catch (error) {
                console.log('[ X ] Error al escribir carts_init.json:', error.message);
            }
        }

        const carts = this.getCarts()
        
        console.log('[ √ ] carts initialized: ', carts)

    }

    addCart = (products) => {

        let carts = this.getCarts()
        
        let id = this.#generateID(carts);

        let newCart = {id, products};

        carts.push(newCart);

        fs.writeFileSync(
            this.carts_path, 
            JSON.stringify(carts, null, 4)
        );

        carts = this.getCarts()
        
        console.log('[ √ ] carts updated: ', carts)
    }

    addProductToCart = (cid, pid) => {
        let carts = this.getCarts()
        let newProduct = true
        carts.map((cart) => {
            if (cart.id === cid){
                cart.products.map((cartProduct) => {
                    if(cartProduct.pid === pid){
                        cartProduct.quantity = cartProduct.quantity + 1
                        fs.writeFileSync(
                            this.carts_path, 
                            JSON.stringify(carts, null, 4)
                        )
                        newProduct = false
                    }
                })
                if (newProduct){
                    cart.products.push({ pid, quantity: 1})
                    fs.writeFileSync(
                        this.carts_path, 
                        JSON.stringify(carts, null, 4)
                    )
                }
            }
        })
    }

    getCartProducts = (id) => {
        let carts = this.getCarts()
        const cartProducts = carts.find((cart) => cart.id === id).products
        return cartProducts
    }
}

export default new CartManager()

