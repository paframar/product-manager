import { Router } from 'express';
import ProductManager from '../dao/ProductManager.js';

const router = new Router()
let productManager = new ProductManager()

router.get('/', (req, res) => {
    const products = productManager.getProducts()
    res.render('home', { products })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeProducts', {})
})

export default router