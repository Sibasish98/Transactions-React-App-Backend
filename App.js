const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors({origin: "*"}))

const port = process.env.PORT||5000
app.get("/",(req,res) => {
    res.send("Working... got response...")
})
app.get("/fundbalance",(req,res) => {
    res.json({balance: 501})
})
app.listen(port,() => console.log("Listeneing..."))