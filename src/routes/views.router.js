import { Router } from 'express';
// import ProductManager from '../dao/ProductManager.js';
import MongoProductManager from '../dao/MongoProductManager.js';

const router = new Router()
// let productManager = new ProductManager()
let productManager = new MongoProductManager()


router.get('/', (req, res) => {
    // const products = productManager.getProducts()
    // res.render('home', { products })
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        console.log('router views/realtimeproducts - products obtained.')
        res.render('realtimeProducts', { products })
    } catch (error) {
        console.log('error - router views/realtimeproducts.')
    }
})

export default router