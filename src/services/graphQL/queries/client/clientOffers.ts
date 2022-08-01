import { gql } from '@apollo/client';

const GET_OFFERS = gql`
    query OffersQuery($agencyId: uuid) {
        offers(where: { agency_id: { _eq: $agencyId } }) {
            created_at
            description
            id
            image_url
            status
            title
            updated_at
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { GET_OFFERS };
