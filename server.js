import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {mongoURI} from './config/keys.js'
import itemRoutes from './routes/api/items.js'
const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

const connectDB = async () =>{
    try{
        const conn =  await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

connectDB();
app.use('/api/items',itemRoutes);
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server Started on port ${port}`))