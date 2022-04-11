const { AuthenticationError } = require('apollo-server-express')
const { User, Shirt, Category, Order } = require('../models')
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_51KnWTLJspjbSsWAyeelYzgt21wbCIe7TLNZXztNJajiYsFcJUZ7yBA75WzYJfEVMK5QqgvkgAdAG3NoiEDcDGBFB00s2PZ3R5M')

