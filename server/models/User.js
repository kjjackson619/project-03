const mongoose = require('mongoose');
const { isValidPassword } = require('mongoose-custom-validators');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 28,
        validate: {
            validator: isValidPassword,
            message: 'Password must have at lease 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
        }
    },
    orders: [Order.schema]
})

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;