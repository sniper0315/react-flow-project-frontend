import { gql } from '@apollo/client';

const GET_CLIENT_CUPTION_EXAMPLES = gql`
    query GetClientCaptionExamples($client_organization_id: uuid!) {
        client_organization_caption_examples(where: { client_organization_id: { _eq: $client_organization_id } }) {
            id
            concept
            client_organization_id
            caption
        }
    }
`;
const GET_AI_TOOLS_HISTORY = gql`
    query GetClientCaptionExamples($service: ai_tools_services_enum!, $client_organization_id: uuid!) {
        ai_tools_history(where: { service: { _eq: $service }, client_organization_id: { _eq: $client_organization_id } }) {
            timestamp
            service
            output
            organization_id
            input
            id
            client_organization_id
        }
    }
`;

// eslint-disable-next-line import/prefer-default-export
export { GET_CLIENT_CUPTION_EXAMPLES, GET_AI_TOOLS_HISTORY };
