import { gql } from '@apollo/client';

const INVITE_MEMBER = gql`
    mutation inviteMember($email: String!, $message: String!) {
        client_invitation_create(arg1: { email: $email, message: $message }) {
            agency_id
            client_email
            client_organization_id
            created_at
            status
            updated_at
        }
    }
`;
const DELETE_MEMBER = gql`
    mutation Mutation($organization_id: String!, $user_id: String!) {
        organization_member_remove(arg1: { organization_id: $organization_id, user_id: $user_id }) {
            organization_id
            role_id
            status
            type
            user_id
        }
    }
`;
const ADD_MEMBER_DEV = gql`
    mutation Mutation($organization_id: String!, $user_id: String!, $role: String!) {
        organization_member_add(arg1: { organization_id: $organization_id, user_id: $user_id, role: $role }) {
            organization_id
            role_id
            status
            type
            user_id
        }
    }
`;
const CANCEL_INVITE = gql`
    mutation cancelInvite($email: String!, $message: String!) {
        organization_invitation_cancel(arg1: { message: $message, email: $email }) {
            updated_at
            status
            agency_id
            member_email
            created_at
            message
        }
    }
`;
const ACCEPT_INVITE = gql`
    mutation Mutation($user_id: String!, $email: String!) {
        organization_invitation_accept(arg1: { user_id: $user_id, email: $email }) {
            updated_at
            status
            agency_id
            member_email
            created_at
            message
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { INVITE_MEMBER, DELETE_MEMBER, ADD_MEMBER_DEV, CANCEL_INVITE, ACCEPT_INVITE };
