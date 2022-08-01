import { gql } from '@apollo/client';

const GET_OFFERS = gql`
    query GetOffers {
        offers {
            updated_at
            title
            image_url
            description
            created_at
            id
            agency {
                id
                name
            }
        }
    }
`;
// eslint-disable-next-line import/prefer-default-export
export { GET_OFFERS };
