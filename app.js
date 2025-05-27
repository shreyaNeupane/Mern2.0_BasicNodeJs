const express = require('express')
const app = express()

const connectToDatabase = require('./database');


// Alternative
//  const app = require('express')( )
connectToDatabase(); 

app.get("/",(req,res)=>{
    res.json("bye world")
})

app.listen(3000,()=>{
    console.log("Node js server has stated at port 3000")
})