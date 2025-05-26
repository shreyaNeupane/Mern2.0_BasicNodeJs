const express = require('express')
const app = express()

// Alternative
//  const app = require('express')( )

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(3000,()=>{
    console.log("Node js server has stated at port 3000")
})