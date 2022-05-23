const express = require('express')
const app = express()
const port = 5000
app.get("/",(req,res) => {
    res.send("Working... got response...")
})
app.listen(port,() => console.log("Listeneing..."))