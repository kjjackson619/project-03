//const { ProvidedRequiredArgumentsOnDirectivesRule } = require('graphql/validation/rules/ProvidedRequiredArgumentsRule')
const db = require('./connection');
const { User, Shirt, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany()

    const categories = await Category.insertMany([
        { name: 'T-Shirt (Short Sleeve)' },
        { name: 'T-Shirt (Long Sleeve)' },
        { name: 'Hoodie' },
        { name: 'Crewneck' },
        { name: 'Tank Top' },
        { name: 'Dress Shirt' },
        { name: 'Sweater' },
        { name: 'Coat/Jacket' },
        { name: 'Flannel' },
        { name: 'Polo' },
        { name: 'Womens' },
    ])

    console.log('Categories seeded');

    await Shirt.deleteMany();

    const shirts = await Shirt.insertMany([
        {
            name: 'Black Short Sleeve T-Shirt',
            color: 'black',
            price: 9.99,
            category: categories[0]._id,
            image: 'shortsleeve-black-1.jpg',

        },
        {
            name: 'Black Long Sleeve T-Shirt',
            color: 'Black',
            price: 14.99,
            category: categories[1]._id,
            image: 'longsleeve-black-1.jpg',
        },
        {
            name: 'Navy Hoodie',
            color: 'Navy',
            price: 34.99,
            category: categories[2]._id,
            image: 'hoodie-navy-1.jpg',
        },
        {
            name: 'Blue Crewneck',
            color: 'Blue',
            price: 29.99,
            category: categories[3]._id,
            image: 'crewneck-blue-1.jpg',
        },
        {
            name: 'Black Tank Top',
            color: 'Black',
            price: 8.99,
            category: categories[4]._id,
            image: 'tanktop-black-1.jpg',
        },
        {
            name: 'Light Blue Dress Shirt',
            color: 'Light Blue',
            price: 39.99,
            category: categories[5]._id,
            image: 'dress-lightblue-1.jpg',
        },
        {
            name: 'Blue Sweater',
            color: 'Blue',
            price: 29.99,
            category: categories[6]._id,
            image: 'sweater-blue-1.jpg',
        },
        {
            name: 'Black Coat',
            color: 'Black',
            price: 99.99,
            category: categories[7]._id,
            image: 'coat-black-1.jpg',
        },
        {
            name: 'White Flannel with Black Stripes',
            color: 'White/Black',
            price: 59.99,
            category: categories[8]._id,
            image: 'flannel-whiteblack-1.jpg',
        },
        {
            name: 'Pink Polo',
            color: 'Pink',
            price: 39.99,
            category: categories[9]._id,
            image: 'polo-pink-1.jpg',
        },
        {
            name: 'Black Womens Cut T-Shirt',
            color: 'Black',
            price: 9.99,
            category: categories[10]._id,
            image: 'womens-black-1.jpg ',
        }
    ]);

    console.log('Shirts Seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'Kevin',
        lastName: 'Jackson',
        email: 'kjackson@test.com',
        password: 'Password1!kjackson',
        orders: [
            {
                shirts: [shirts[0]._id]
            }
        ]
    });

    await User.create({
        firstName: 'Jonathan',
        lastName: 'Chastain',
        email: 'jchastain@test.com',
        password: 'Password1!jchastain',
        orders: [
            {
                shirts: [shirts[0].id, shirts[4].id, shirts[6].id]
            }
        ]
    });

    await User.create({
        firstName: 'Nikhil',
        lastName: 'Makhija',
        email: 'nmakhija@test.com',
        password: 'Password1!nmakhija',
        orders: [
            {
                shirts: [shirts[9].id, shirts[10].id]
            }
        ]
    });

    await User.create({
        firstName: 'Matthew',
        lastName: 'Brining',
        email: 'mbrining@test.com',
        password: 'Password1!mbrining'
    });

    console.log('Users Seeded');

    process.exit();
});