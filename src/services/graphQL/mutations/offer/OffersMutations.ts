import { gql } from '@apollo/client';

const CREATE_OFFER = gql`
    mutation CreateOffer($title: String!, $description: String, $image_url: String, $agency_id: uuid!) {
        insert_offers_one(object: { title: $title, image_url: $image_url, description: $description, agency_id: $agency_id }) {
            updated_at
            title
            image_url
            id
            description
            created_at
            agency_id
        }
    }
`;
const EDIT_OFFER = gql`
    mutation UpdateOffer($id: uuid!, $title: String, $image_url: String, $description: String) {
        update_offers_by_pk(pk_columns: { id: $id }, _set: { title: $title, image_url: $image_url, description: $description }) {
            updated_at
            title
            image_url
            id
            description
            created_at
            agency_id
        }
    }
`;
const DEACTIVE_OFFER = gql`
    mutation DeactiveOffer($id: uuid!, $status: offers_status_enum) {
        update_offers_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
            updated_at
            title
            image_url
            id
            description
            created_at
            agency_id
            status
        }
    }
`;

export { CREATE_OFFER, EDIT_OFFER, DEACTIVE_OFFER };
