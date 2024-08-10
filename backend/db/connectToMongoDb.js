import mongoose from 'mongoose'

const connectTomongoDb = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL)
        console.log('MongoDB connected')
    }
    catch (err) {
        console.log(err)
    }

}
export default connectTomongoDb;