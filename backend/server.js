import express from'express'
const app = new express()
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 7895
import connectToMongoDB from "./db/connectToMongoDb.js";
import authRoutes from './routes/auth.routes.js'
import courseRoutes from './routes/course.routes.js'


app.use(cors('*'))
app.use(express.json())



app.use("/auth", authRoutes);

app.use("/course", courseRoutes);



app.use('/',(req,res)=>{
    res.send('server running')
})
app.listen(PORT,()=>{
    connectToMongoDB()
    console.log('Server is running at http://localhost:' + PORT);
})