let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const { DateTime } = require("luxon");  //for date handling


let transactionSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now  
    },
});


module.exports = mongoose.model('Transaction', transactionSchema);