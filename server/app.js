import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from './config.js'
import authRouter from './routes/Auth.js'
import userRouter from './routes/userRoute.js'
const app=express()
dotenv.config()

const PORT=process.env.PORT||3001

app.use(express.json())
app.use(cookieParser())

//cors setting
const allowedOrigins = [process.env.CLIENT_URL];
const corsOptions = {
  origin: [allowedOrigins],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/auth',authRouter)
app.use('/user',userRouter)


app.listen(PORT,()=>{
    connect
    console.log(`listening to port${PORT}`)
})

