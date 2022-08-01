import { gql } from '@apollo/client';

const GET_TEAMS = gql`
    query getTeams {
        organizations {
            id
            name
            members {
                organization_id
                role_id
                status
                user_id
                type
                created_at
                user {
                    id
                    email
                    first_name
                    last_name
                    image_url
                }
            }
        }
    }
`;
const GET_PENDING_MEMBERS = gql`
    query getPendingMembers {
        organizations(where: { id: { _eq: "e4d49bee-2000-49e8-a953-b3b15e24698d" } }) {
            address_id
            created_at
            id
            name
            status
            type
            member_invites {
                member_email
                message
                created_at
                agency_id
                status
            }
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { GET_TEAMS, GET_PENDING_MEMBERS };
