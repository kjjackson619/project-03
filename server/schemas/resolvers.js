const { AuthenticationError } = require('apollo-server-express')
const { User, Shirt, Category, Order } = require('../models')
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_51KnWTLJspjbSsWAyeelYzgt21wbCIe7TLNZXztNJajiYsFcJUZ7yBA75WzYJfEVMK5QqgvkgAdAG3NoiEDcDGBFB00s2PZ3R5M')

const resolvers = {
    Query: {
        categories: async()=>{
            return await Category.find()
        },
        shirts: async(parent, {category})=>{
            const params = {}
            if(category){
                params.category = category
            }

            return await Product.find(params).populate('category')
        },
        shirt: async(parent, {_id})=>{
            return await Product.findById(_id).populate('category')
        },
        user: async(parent, args, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                })

                user.orders.sort((a,b) => b.purchaseDate - a.purchaseDate)

                return user
            }

            throw new AuthenticationError('Not logged in')
        },
        order: async(parent, {_id}, context) => {
            if(context.user){
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                })

                return user.order.id(_id)

            }

            throw new AuthenticationError('Not logged in')
        },
        checkout: async(parent, args, context) => {
            const url = new URL(context.headers.referer).origin
            const order = new Order({shirts: args.shirts})
            const line_items = []

            const {shirts} = await order.populate('products').execPopulate()

            for(let i = 0; i <shirts.length; i++){
                const shirt = await stripe.product.create({
                    name: shirts[i].name,
                    description: shirts[i].description,
                    images: [`${url}/images/${prodcuts[i].image}`]
                })

                const price = await stripe.prices.create({
                    product: shirt.id,
                    unit_amout: shirts[i].price * 100,
                    currency: 'usd'
                })

                line_items.push({
                    prics: price.id,
                    quantity: 1
                })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            })
        }
    },
    Mutation: {
        addUser: async(parent, args)=>{
            // create user with data from arguments
            const user = await User.create(args)

            //sign token with user data
            const token = signToken(user)
        },
        login: async(parent, {email, password}) =>{
            //gets user by email
            const user = await User.findOne({email})

            //checks to see if user exists
            if(!user){
                throw new AuthenticationError('Incorrect credentials!')
            }

            //boolean: if password is correct or not
            const correctPassword = await user.isCorrectPassword(password)

            //if false, then throw error
            if(!correctPassword){
                throw new AuthenticationError('Incorrect credentials!')
            }

            //sign token with user data
            const token = signToken(user)

            //return token and user
            return {token,user}
        },
        addOrder: async(parent, {prodcuts}, context) => {
            //checks to see if a user is logged in
            if(context.user){
                //if true adds order to users orders
                return await User.findByIdAndUpdate(context.user._id, args, {new: true})
            }

            //if no user logged in, throw auth error
            throw new AuthenticationError('Not logged in')
        },
        updateShirt: async(parent, {_id, price})=>{
            //updates shirt price and returns it
            return await Shirt.findByIdAndUpdate(_id, {price: price}, {new: true})
        }
    }
}

module.exports = resolvers