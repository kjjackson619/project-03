const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }
    
    type Shirt {
        _id: ID
        name: String
        color: String
        price: Float
        category: Category
    }

    type Order { 
        _id: ID
        purchaseDate: String
        shirts: [Shirt]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }

    type Checkout {
        session: ID
    }   
    
    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        shirts: [Shirt]
        shirt(_id: ID!): Shirt
        user: User
        order(_id: ID!): Order
        checkout(shirts: [ID]!): Checkout
    }

    type Mutation { 
        addUser(firstName: String!, lastName: String!, email: String! password: String!): Auth
        login(email: String!, password: String!): Auth
        addOrder(product: [ID]!): Order
        updateShirt(_id: ID!, price: Float!): Shirt
    }
`
module.exports = typeDefs