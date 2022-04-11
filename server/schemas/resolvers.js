const { AuthenticationError } = require('apollo-server-express')
const { User, Shirt, Category, Order } = require('../models')
const { signToken } = require('../utils/auth')