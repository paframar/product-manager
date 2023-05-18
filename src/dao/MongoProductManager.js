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

    async deleteProduct(productId) {
      try {
        await productsDAO.findByIdAndRemove(productId).exec();
        console.log(`Product with id ${productId} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting product from Mongo DB: ', error);
      }
    }

    async updateProduct(productId, updatedProduct) {
      try {
        const updated = await productsDAO.findByIdAndUpdate(productId, updatedProduct, { new: true }).lean().exec();
        console.log(`Product with id ${productId} updated successfully.`);
        return updated;
      } catch (error) {
        console.error('Error updating product in Mongo DB: ', error);
        return null;
      }
    }

  }

export default MongoProductManager
