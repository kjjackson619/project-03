import { gql } from '@apollo/client';

export const QUERY_SHIRTS = gql`
query getProducts($category: ID) {
    products(category: $category) {
        _id
        name
        color
        price
        category {
            _id
        }
    }
}
`;

export const QUERY_CHECKOUT = gql`
query getCheckout($products: [ID]!) {
    checkout(products: $products) {
        session
    }
}
`;

export const QUERY_CATEGORIES = gql`
{
    categories {
        _id
        name
    }
}
`;

export const QUERY_USER = gql`
{
    user {
        firstName
        lastName
        orders {
            _id
            purchaseDate
            shirts {
                _id
                name
                color
                price
                category
                image
            }
        }
    }
}
`;