import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;


export const ADD_ORDER = gql`
mutation addOrder($shirts: [ID]!) {
    addOrder(shirts: $shirts) {
        purchaseDate
        shirts {
            _id
            name
            color
            price
            image
            category {
                _id
            }
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}
`;

export const UPDATE_SHIRT = gql`
mutation updateShirt($ID: [ID]!, $price: Float!) {
    updateShirt(_id: $ID, price: $price) {
        shirt {
            _id
            name
            color
            price
            image
            category {
                _id
            }
        }
    }
}
`;
