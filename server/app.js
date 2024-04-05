import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

const app=express()
dotenv.config()

const PORT=process.env.PORT||3001

app.use(express.json())
app.use(cookieParser())


app.listen(PORT,()=>{
    console.log(`listening to port${PORT}`)
})

