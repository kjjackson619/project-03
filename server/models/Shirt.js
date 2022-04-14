const mongoose = require('mongoose');

const { Schema } = mongoose;

const shirtSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 4.00
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Shirt = mongoose.model('Shirt', shirtSchema);

module.exports = Shirt;