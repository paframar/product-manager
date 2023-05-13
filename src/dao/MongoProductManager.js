import productsDAO from "./models/products.model.js";

class MongoProductManager {

    async getProducts() {
      try {
        const products = await productsDAO.find().lean().exec();
        console.log('Products recived from Mongo DB.');
        return products;
      } catch (error) {
        console.error('Error getting products from Mongo DB: ', error);
        return null;
      }
    }

    async addProduct(newProduct){
        try{
            await productsDAO.create(newProduct)
            console.log('manager: producto creado.')
        } catch(err) {
            console.log('error al crear el producto.', err)
        }
    }
  }

export default MongoProductManager
