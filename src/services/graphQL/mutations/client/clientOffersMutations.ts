import { gql } from '@apollo/client';

const CHANGE_OFFER_STATUS = gql`
    mutation MyMutation($status: String!, $projectId: uuid!) {
        update_projects_by_pk(pk_columns: { id: $projectId }, _set: { status: $status }) {
            created_at
            details
            id
            name
            offer_id
            status
            business_id
            agency_id
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { CHANGE_OFFER_STATUS };
