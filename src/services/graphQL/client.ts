import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SNIKPIC_GQL_URL
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers, removeHeader }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            ...(!removeHeader && { authorization: token && `Bearer ${token}` }),
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
            'x-hasura-role': 'MANAGER',
            'x-hasura-organization-id': 'e4d49bee-2000-49e8-a953-b3b15e24698d',
            'x-hasura-user-id': 'a224d59c-95a5-4216-917c-06ae38ab7463'
        }
    };
});

const createApolloClient = () =>
    new ApolloClient({
        link: from([authLink, httpLink, errorLink]),
        cache: new InMemoryCache()
    });

// eslint-disable-next-line import/prefer-default-export
export const client = createApolloClient();
