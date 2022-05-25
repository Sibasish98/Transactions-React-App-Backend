const mongoose = require("mongoose")

const scheme = mongoose.Schema({
    type: String,
    subject: String,
    amount: Number,
    datetime: Date
})

const modell = mongoose.model("transaction",scheme)
module.exports = modell