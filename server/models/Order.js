const mongoose = require('mongoose')

const { Schema } = mongoose

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    shirts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Shirt'
        }
    ]
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order