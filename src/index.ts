import 'dotenv/config'
import express from "express"
import morgan from "morgan"
import indexRouter from './routers/indexRouter'

const app= express()

const PORT= process.env["PORT"]

app.use(morgan("dev"))
app.use(express.json())
app.use("/", indexRouter)

app.listen(PORT, ()=>{
    console.log("Test Management Service Running")
})