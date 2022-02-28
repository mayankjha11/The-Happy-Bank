const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
});

// Virtual for this customer instance URL.
customerSchema.virtual('url').get(function() {
    return '/customer/' + this._id;
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;