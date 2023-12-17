const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    customer: {
        type: Schema.ObjectId,
        ref: 'Customers',
        trim: true
    },
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        },
        quantity: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Orders', ordersSchema);