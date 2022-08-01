import { gql } from '@apollo/client';

const GET_ORGANIZATION_MEMBERS_BY_ROLE = gql`
    query MyQuery($role: String!) {
        organization_members(where: { role: { name: { _eq: $role } } }) {
            id
            organization_id
            user {
                first_name
                image_url
                id
            }
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { GET_ORGANIZATION_MEMBERS_BY_ROLE };
