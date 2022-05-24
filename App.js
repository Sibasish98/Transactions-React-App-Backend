const express = require('express')
const app = express()
const cors = require('cors');
const bodyy = require('body-parser')

app.use(cors({origin: "*"}))
app.use(bodyy.json());
//app.use(app.router);

let balance = 0

const port = process.env.PORT||5000
app.get("/",(req,res) => {
    res.send("Working... got response...")
})
app.get("/fundbalance",(req,res) => {
    res.json({balance: balance})
})


const transaction = {transactions: [
    {
      "id": 1,
      "type": "credit",
      "subject": "Fund created",
      "amount": 0,
      "datetime": "Sun May 22 2022 06:17:00 GMT+0530 (India Standard Time)"
    },]
}


app.get("/transactions",(req,res) => {
    res.json(transaction);
})


app.post("/transactions",(req,res) => {
    //console.log(req.body)
    transaction.transactions.push(req.body)
    if (req.body.type == "credit")
    {
        balance+= parseInt(req.body.amount)
    }
    else  if (req.body.type == "debit")
    {
        balance-= parseInt(req.body.amount)
    }
    res.send("200")
})

app.listen(port,() => console.log("Listeneing..."))