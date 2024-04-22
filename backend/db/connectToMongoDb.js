import mongoose  from 'mongoose'
const connectTomongoDb = ()=>{mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('DB connected successfully');
})
.catch(err => console.log('Error connecting to DB',err))
}
export default connectTomongoDb;