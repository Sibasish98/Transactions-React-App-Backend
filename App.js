const express = require('express')
const app = express()
const port = process.env.PORT
app.get("/",(req,res) => {
    res.send("Working... got response...")
})
app.listen(port,() => console.log("Listeneing..."))