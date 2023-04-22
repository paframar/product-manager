const { Router } = require('express');
const ProductManager = require('../classes/ProductManager.js');

const router = new Router()
let productManager = new ProductManager()

router.get('/', (req, res) => {
    const products = productManager.getProducts()
    res.render('home', { products })
})

router.get('/realtimeproducts', (req, res) => {
    console.log('endpoint /realtimeproducts')
    const products = productManager.getProducts()
    res.render('realtimeProducts', { products })
})

module.exports = router