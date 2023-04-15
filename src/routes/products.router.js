import { Router } from 'express'
import manager from '../classes/ProductManager.js'

const router = Router()

router.get('/', (req, res)=> {
    const limit = Number(req.query.limit)
    const products = manager.getProducts(limit)
    console.log(limit 
        ? `[ √ ] products getted - limit: ${limit}` 
        : `[ √ ] products getted` 
    )
    res.send({ products })
});

router.get('/:pid', (req, res)=> {
    let product = manager.getProductById(Number(req.params.pid))
    console.log(req.params.pid 
        ? `[ √ ] products getted. id: ${req.params.pid}` 
        : `[ √ ] products getted`
    )
    res.send ( { product } )
});

router.post('/', (req, res)=>{
    const { title, description, price, thumbnail, code, stock, status } = req.body;
    manager.addProduct(title, description, price, thumbnail, code, stock, status);
    res.send('[ √ ] Product added!');
    
});

export default router