import MongoProductManager from "./dao/MongoProductManager.js"

export default (io) => {

    io.on('connection', (socketClient) => {
        console.log('`connection` listened.')
        console.log(`Socket #${socketClient.id} connected.`)

        const productManager = new MongoProductManager()
        
        const sendProducts = async () => {
            const products = await productManager.getProducts();
            console.log('Products recived from manager.')
            io.emit('loadProducts', products)
            console.log('`loadProducts` emmited.')
        }
        sendProducts()

        socketClient.on('updateProducts', () => {
            console.log('`updateProducts` listened.')
            sendProducts()  
        })
    })

    console.log('Server socket events configured.')

}