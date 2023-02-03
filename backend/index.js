import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js'
import postRouter from './Routers/postRouter.js'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))
app.use("/users", userRouter)
app.use("/posts", postRouter)

mongoose.set("strictQuery", true);
app.listen(PORT, ()=> {
    mongoose.connect(`${process.env.DB_CONNECTION}`)
    .then(()=> console.log("connected to db"))
    .catch((error)=> console.log(error))
})
