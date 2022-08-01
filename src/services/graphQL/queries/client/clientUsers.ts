import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
    query MyQuery {
        client_organizations {
            agency_id
            id
            name
            members {
                id
                organization_id
                status
                user_id
                user {
                    first_name
                    email
                    image_url
                    last_name
                    phone
                }
            }
            client_relevant_links {
                agency_id
                client_id
                created_at
                icon
                id
                title
                updated_at
                url
            }
        }
    }
`;

const GET_SPECIFIC_CLIENT = gql`
    query MyQuery($clientOrganizationId: uuid!) {
        client_organizations_by_pk(id: $clientOrganizationId) {
            agency_id
            id
            logo_url
            name
            status
            members {
                id
                organization_id
                role_id
                status
                user_id
                user {
                    first_name
                    agency_id
                    id
                    image_url
                    last_name
                    phone
                    email
                }
            }
            client_relevant_links {
                title
                url
                id
                icon
            }
        }
    }
`;

const INVITE_CLIENT = gql`
    mutation InviteClient($email: String!) {
        client_invitation_create(arg1: { email: $email }) {
            updated_at
            status
            created_at
            client_organization_id
            agency_id
            client_email
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { GET_CLIENTS, GET_SPECIFIC_CLIENT, INVITE_CLIENT };
