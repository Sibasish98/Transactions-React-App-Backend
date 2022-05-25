const mongoose = require('mongoose')
const scheme = mongoose.Schema({
    balance: Number,
})

 const modell = mongoose.model('balance',scheme)

module.exports = modell