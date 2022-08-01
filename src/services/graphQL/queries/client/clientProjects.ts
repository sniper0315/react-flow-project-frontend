import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
    query MyQuery($organizationId: uuid) {
        projects(where: { agency_id: { _eq: $organizationId } }) {
            agency_id
            business_id
            created_at
            details
            id
            name
            offer_id
            status
            offer {
                description
                id
                image_url
                status
                title
                updated_at
            }
            project_users {
                organization_member {
                    id
                    user {
                        first_name
                        id
                    }
                }
                organization_members_id
                project_id
            }
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { GET_PROJECTS };
