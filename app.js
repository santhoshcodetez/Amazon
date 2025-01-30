const express=require("express")
const app=express()
app.use(express.json())
const router=require('./routes/routes')
app.use('/api',router)
module.exports=app;