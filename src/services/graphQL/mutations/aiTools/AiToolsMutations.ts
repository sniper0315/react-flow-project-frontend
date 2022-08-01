import { gql } from '@apollo/client';

const GET_RELEVANT_EVENTS = gql`
    mutation GetRelevantEvents($client_organization_id: String!, $year: Int, $month: Int, $day: Int, $desc: String!) {
        ai_tools_get_related_event(
            arg1: { client_organization_id: $client_organization_id, year: $year, month: $month, desc: $desc, day: $day }
        ) {
            url
            score
            name
            excerpt
            date
        }
    }
`;
const GENERATE_CONCEPT = gql`
    mutation GenerateConcept($client_organization_id: String!, $brand_description: String!, $period: String!) {
        ai_tools_generate_concept(
            arg1: { brand_type: $brand_description, client_organization_id: $client_organization_id, period: $period }
        ) {
            type
            description
        }
    }
`;
const GENERATE_CAPTION = gql`
    mutation GenerateCaption($category: String!, $client_organization_id: String!, $language: String!, $concept_description: String!) {
        ai_tools_generate_caption(
            arg1: {
                category: $category
                client_organization_id: $client_organization_id
                language: $language
                request: $concept_description
            }
        ) {
            caption
        }
    }
`;
const CAPTION_EXAMPLE = gql`
    mutation InsertCaptionExample($client_organization_id: uuid!, $concept: String!, $caption: String!) {
        insert_client_organization_caption_examples_one(
            object: { concept: $concept, client_organization_id: $client_organization_id, caption: $caption }
        ) {
            id
            concept
            client_organization_id
            caption
        }
    }
`;

export { GET_RELEVANT_EVENTS, GENERATE_CONCEPT, GENERATE_CAPTION, CAPTION_EXAMPLE };
