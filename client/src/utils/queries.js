import { gql } from '@apollo/client';

export const QUERY_SHIRTS = gql`
query Shirts($category: ID) {
    shirts(category: $category) {
      name
      _id
      color
      price
      image
      category {
        name
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
query getCheckout($shirts: [ID]!) {
    checkout(shirts: $shirts) {
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
                category {
                    name
                }
                image
            }
        }
    }
}
`;