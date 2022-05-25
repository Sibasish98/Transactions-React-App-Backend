const fundbalance = require('./fundschemea')
const transactionModel = require("./transactionschema")

const express = require('express')
const app = new express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyy = require('body-parser')


app.use(cors({
    origin: "*"
}))
app.use(bodyy.json())

app.get("/fundbalance",(req,res) => {
   // console.log("Request to get fundbalance")
    fundbalance.findOne()
    //new fundbalance({balance: 456}).save()
    .then((result) => {
       // console.log(result)
        res.send(result)
    })
    .catch((e) => console.log(e))
})

app.get("/transactions",(req,res) => {
    transactionModel.find().sort({datetime: -1})

    .then((result) => {
        //console.log(result)
        res.send({transactions: result})
    })
    .catch((e) => console.log(e))
})

//save the transaction
app.post("/transactions",(req,res) => {
   // console.log(req.body)
    new transactionModel({
        type: req.body.type,
        subject: req.body.subject,
        amount: parseFloat(req.body.amount),
        datetime: new Date(),
    }).save()
    .then((dt) => {
          //get current balance  and calculate new balance
          let p = null
        p = fundbalance.findOne()
        .then((dt) => {
            let tempBalance = (dt.balance);
            if (req.body.type == "credit")
            {
               tempBalance += parseFloat((req.body.amount))
               
            }
            else
            {
                tempBalance -= parseFloat((req.body.amount))
            }
            fundbalance.updateOne({balance: dt.balance},{balance: tempBalance})
            .then((s) => 
            {
                console.log(s)
                console.log("Saved succesfully")
                res.send("200")
            })
            .catch((e) => console.log(e))
        })
       

        })
    .catch((e) => console.log(e))
})

//delete transaction record from db and update the fund balance
app.delete("/",(req,res) => {
    //fetch the transaction with body.id to get the amount
   // console.log("delete id" +req.body.id)
    transactionModel.findById(req.body.id)
    .then((dt) => {
        console.log(dt)
        fundbalance.findOne()
        .then((balancee) => {
            let tempBalance =  balancee.balance
            if (dt.type == "credit")
            {
                tempBalance -=  dt.amount;
            }
            else{
                tempBalance += dt.amount;   
            }
           // console.log("After delete balance "+tempBalance)
            fundbalance.updateOne({balance: balancee.balance},{balance: tempBalance})
            .then((ee) => {
                //updated fund balanc above and now lets remove the transaction from record
                //console.log("fund balance updated")
                transactionModel.deleteOne({_id: req.body.id})
                .then((tt) => {
                   // console.log("Record removed")
                    res.send("200")
                })
            })
        })
    })
})



const con = mongoose.connect('mongodb+srv://sibasish:sibasish99@cluster0.tmykr.mongodb.net/transaction-react-app?retryWrites=true&w=majority')
.then((t) => {
    //console.log('connected to db')
    app.listen(process.env.PORT||5000,() => console.log("Listeneing at port..."))
})

//get fund balance

