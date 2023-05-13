import { connect, set } from "mongoose";

const connectDB = async () => {
    try {
        set('strictQuery', false)
        await connect('mongodb+srv://paframar:mqoqE3BQ3VYiVGjj@product-manager-39755-b.gbsi798.mongodb.net/ecommerce', { useNewUrlParser: true })
        console.log('Database connected.')
    } catch (error) {
      console.log('DB Error:')
      console.log(error)
    }
}

export default connectDB