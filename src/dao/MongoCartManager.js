import cartsDAO from "./models/carts.model.js";

class MongoCartManager {

    async getCart(userId) {
      try {
        const cart = await cartsDAO.findOne({ userId }).lean().exec();
        console.log('Cart recived from Mongo DB.');
        return cart
      } catch (error) {
        console.error('Error getting carts from Mongo DB: ', error);
        return null;
      }
    }

    async InitializeUserCart(userId) {
      const cart = this.getCart(userId);
      console.log('cart ', cart)
      // const emptyModel = {
      //   userId,
      //   products: [],
      // };
      // cardsDAO.create(emptyModel)
    }

    // async addCartProduct(newProduct){
    //     try{
    //         await productsDAO.create(newProduct)
    //         console.log('manager: producto creado.')
    //     } catch(err) {
    //         console.log('error al crear el producto.', err)
    //     }
    // }

    // async deleteCartProduct(productId) {
    //   try {
    //     await productsDAO.findByIdAndRemove(productId).exec();
    //     console.log(`Product with id ${productId} deleted successfully.`);
    //   } catch (error) {
    //     console.error('Error deleting product from Mongo DB: ', error);
    //   }
    // }

    // async updateCartProduct(productId, updatedProduct) {
    //   try {
    //     const updated = await productsDAO.findByIdAndUpdate(productId, updatedProduct, { new: true }).lean().exec();
    //     console.log(`Product with id ${productId} updated successfully.`);
    //     return updated;
    //   } catch (error) {
    //     console.error('Error updating product in Mongo DB: ', error);
    //     return null;
    //   }
    // }

}

export default MongoCartManager
