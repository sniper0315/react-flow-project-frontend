import { gql } from '@apollo/client';

const INSERT_CLIENT_RELEVANT_LINKS_ONE = gql`
    mutation MyMutation($agency_id: uuid!, $client_id: uuid!, $title: String!, $url: String!) {
        insert_client_relevant_links_one(object: { agency_id: $agency_id, client_id: $client_id, title: $title, url: $url }) {
            title
            url
            icon
            id
            updated_at
        }
    }
`;

const EDIT_CLIENT_RELEVANT_LINKS_BY_PK = gql`
    mutation MyMutation($id: uuid!, $title: String!, $url: String!) {
        update_client_relevant_links_by_pk(pk_columns: { id: $id }, _set: { title: $title, url: $url }) {
            id
            title
            url
        }
    }
`;

const DELETE_CLIENT_RELEVANT_LINKS_BY_PK = gql`
    mutation MyMutation($id: uuid!) {
        delete_client_relevant_links_by_pk(id: $id) {
            updated_at
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { INSERT_CLIENT_RELEVANT_LINKS_ONE, EDIT_CLIENT_RELEVANT_LINKS_BY_PK, DELETE_CLIENT_RELEVANT_LINKS_BY_PK };
