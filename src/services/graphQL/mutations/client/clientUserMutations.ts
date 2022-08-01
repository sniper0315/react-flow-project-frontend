import { gql } from '@apollo/client';

const ADD_CLIENT = gql`
    mutation MyMutation($brandName: String!, $contactName: String!, $email: String!, $phone: String!) {
        add_client(arg1: { brandName: $brandName, contactName: $contactName, email: $email, phone: $phone }) {
            organization {
                agency_id
                created_at
                id
                name
                status
            }
            organizationMember {
                created_at
                id
                organization_id
                role_id
                status
                user_id
            }
            user {
                agency_id
                created_at
                email
                first_name
                id
                image_url
                phone
            }
        }
    }
`;

const EDIT_CLIENT = gql`
    mutation MyMutation($clientId: uuid!, $name: String!) {
        update_client_organizations_by_pk(pk_columns: { id: $clientId }, _set: { name: $name }) {
            name
            id
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { ADD_CLIENT, EDIT_CLIENT };
