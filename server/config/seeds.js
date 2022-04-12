const { ProvidedRequiredArgumentsOnDirectivesRule } = require('graphql/validation/rules/ProvidedRequiredArgumentsRule')
const db = require('./connection')
const { User, Shirt, Category } = require('../models')

db.once('open', async() => {
    await Category.deleteMany()

    const categories = await Category.insertMany([
        { name: 'T-Shirt (Short Sleeve)'},
        { name: 'T-Shirt (Long Sleeve)'},
        { name: 'Hoodie'},
        { name: 'Crewneck'},
        { name: 'Tank Top'},
        { name: 'Dress Shirt'},
        { name: 'Sweater'},
        { name: 'Coat/Jacket'},
        { name: 'Flannel'},
        { name: 'Polo'},
        { name: 'Womens'},
    ])

    console.log('Catergories seeded')

    await Shirt.deleteMany()

    const shirts = await Shirt.insertMany([
        {
            name: 'Black Short Sleeve T-Shirt',
            color: 'black',
            price: 9.99,
            category: 'T-Shirt (Short Sleeve)',
            image: 'shortsleeve-black-1.jpg',

        },
        {
            name: 'Black Long Sleeve T-Shirt',
            color: 'Black',
            price: 14.99,
            category: 'T-Shirt (Long Sleeve)',
            image: 'longsleeve-black-1.jpg',
        },
        {
            name: 'Navy Hoodie',
            color: 'Navy',
            price: 34.99,
            category: 'Hoodie',
            image: 'hoodie-navy-1.jpg',
        },
        {
            name: 'Blue Crewneck',
            color: 'Blue',
            price: 29.99,
            category: 'Crewneck',
            image: 'crewneck-blue-1.jpg',
        },
        {
            name: 'Black Tank Top',
            color: 'Black',
            price: 8.99,
            category: 'Tank Top',
            image: 'tanktop-black-1.jpg',
        },
        {
            name: 'Light Blue Dress Shirt',
            color: 'Light Blue',
            price: 39.99,
            category: 'Dress Shirt',
            image: 'dress-lightblue-1.jpg',
        },
        {
            name: 'Blue Sweater',
            color: 'Blue',
            price: 29.99,
            category: 'Sweater',
            image: 'sweater-blue-1.jpg',
        },
        {
            name: 'Black Coat',
            color: 'Black',
            price: 99.99,
            category: 'Coat/Jacket',
            image: 'coat-black-1.jpg',
        },
        {
            name: 'White Flannel with Black Stripes',
            color: 'White/Black',
            price: 59.99,
            category: 'Flannel',
            image: 'flannel-whiteblack-1.jpg',
        },
        {
            name: 'Pink Polo',
            color: 'Pink',
            price: 39.99,
            category: 'Polo',
            image: 'polo-pink-1.jpg',
        },
        {
            name: 'Black Womens Cut T-Shirt',
            color: 'Black',
            price: 9.99,
            category: 'Womens',
            image: 'womens-black-1.jpg ',
        } 
    ])

    console.log('Shirts Seeded')

    await User.deleteMany()

    await User.create({
        firstName: 'Kevin',
        lastName: 'Jackson',
        email: 'kjackson@test.com',
        password: 'passwordkjackson',
        orders: [
            {
                shirts: [shirts[0]._id]
            }
        ]
    })

    await User.create({
        firstName: 'Jonathan',
        lastName: 'Chastain',
        email: 'jchastain@test.com',
        password: 'passwordjchastain',
        orders: [
            {
                shirts: [shirts[0].id, shirts[4].id, shirts[6].id]
            }
        ]
    })

    await User.create({
        firstName: 'Nikhil',
        lastName: 'Makhija',
        email: 'nmakhija@test.com',
        password: 'passwordnmakhija',
        orders: [
            {
                shirts: [shirts[9].id, shirts[10].id]
            }
        ]
    })

    await User.create({
        firstName: 'Matthew',
        lastName: 'Brining',
        email: 'mbrining@test.com',
        password: 'passwordmbrining'
    })

    console.log('Users Seeded')

    process.exit()
})