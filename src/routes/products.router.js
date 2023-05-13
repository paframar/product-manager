import { Router } from 'express'
import ProductManager from '../dao/ProductManager.js'
import MongoProductManager from '../dao/MongoProductManager.js'

// fs
const manager = new ProductManager()
const productManager = new MongoProductManager()

const router = Router()

router.get('/', (req, res) => {
    // const limit = Number(req.query.limit)
    // const products = manager.getProducts(limit)
    // const message = limit 
    //     ? `[ √ ] Products list - limit: ${limit}` 
    //     : `[ √ ] Products list:` 
    // res.send({ message, products })
});

router.get('/:pid', (req, res)=> {
    // let product = manager.getProductById(Number(req.params.pid))
    // const message = req.params.pid 
    //     ? `[ √ ] Product #${req.params.pid}:` 
    //     : `[ √ ] Products list:`
    // res.send ( { message, product } )
});

router.post('/', (req, res)=>{
    // const { title, description, price, thumbnail, code, stock, status } = req.body;
    // const addProductResponse = manager.addProduct(title, description, price, thumbnail, code, stock, status);
    // const message = addProductResponse === true
    //     ? `[ √ ] product added.`
    //     : addProductResponse
    // if (addProductResponse === true){
    //     managerMongo.create(req.body)
    // }
    // res.send({ message });
    console.log('POST /api/product.')
    productManager.addProduct(req.body)
    res.send('Res: producto creado.')
});

router.put('/:pid', (req, res)=>{
    const updateProductResponse = manager.updateProduct(Number(req.params.pid), req.body);
    const products = manager.getProducts();
    const message = updateProductResponse
        ? `[ √ ] Products updated.`
        : `[ X ] Couldn't update. ID ${req.params.pid} not found.`
    res.send({ message, products});
});

router.delete('/:pid', (req, res)=>{
    // const deleteProductResponse = manager.deleteProduct(Number(req.params.pid));
    // const products = manager.getProducts()
    // const message = deleteProductResponse 
    //     ? `[ √ ] Product #${req.params.pid} deleted.`
    //     : `[ X ] Couldn't delete product. ID ${req.params.pid} not found.`
    // res.send({ message, products})

    console.log('DELETE /api/product.')

});

export default router