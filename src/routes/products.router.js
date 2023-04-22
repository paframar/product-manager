const { Router } = require('express')
const ProductManager = require('../classes/ProductManager.js')

const manager = new ProductManager()
const router = Router()

router.get('/', (req, res)=> {
    const limit = Number(req.query.limit)
    const products = manager.getProducts(limit)
    const message = limit 
        ? `[ √ ] Products list - limit: ${limit}` 
        : `[ √ ] Products list` 

    res.send({ message, products })
});

router.get('/:pid', (req, res)=> {
    let product = manager.getProductById(Number(req.params.pid))
    const message = req.params.pid 
        ? `[ √ ] Product #${req.params.pid}:` 
        : `[ √ ] Products list:`

    res.send ( { message, product } )
});

router.post('/', (req, res)=>{
    const { title, description, price, thumbnail, code, stock, status } = req.body;
    const addProductResponse = manager.addProduct(title, description, price, thumbnail, code, stock, status);

    const message = addProductResponse === true
        ? '[ √ ] product added'
        : addProductResponse

    const products = manager.getProducts();
    res.send({ message, products});
});

router.put('/:pid', (req, res)=>{
    const updateProductResponse = manager.updateProduct(Number(req.params.pid), req.body);
    const products = manager.getProducts();
    const message = updateProductResponse
        ? '[ √ ] Products updated.'
        : `[ X ] Couldn't update. ID ${req.params.pid} not found.`
    res.send({ message, products});
});

router.delete('/:pid', (req, res)=>{
    const deleteProductResponse = manager.deleteProduct(Number(req.params.pid));
    const products = manager.getProducts()
    const message = deleteProductResponse 
        ? `[ √ ] Product #${req.params.pid} deleted.`
        : `[ X ] Couldn't delete product. ID ${req.params.pid} not found.`
    res.send({ message, products})
});

module.exports = router