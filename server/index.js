import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRouter from './routes/user.js'

const app=express();


app.use(morgan("dev"));
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())


app.use("/user",userRouter);


// const mongodbURL="mongodb+srv://ninuvv:ninuvv123@cluster0.riy88v8.mongodb.net/tour_db?retryWrites=true&w=majority"
const mongodbURL="mongodb+srv://ninuvv:ninuvv123@cluster0.jry4usx.mongodb.net/poject28?retryWrites=true&w=majority"
mongoose.connect(mongodbURL).then((result) => {
    const port=5000
    app.listen(port,()=>
        console.log(`server is running on ${port}`)
    )  
}).catch((err) => {
    console.log(err+"did not connect")
});
