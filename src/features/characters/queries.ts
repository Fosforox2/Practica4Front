import { gql } from "@apollo/client";

export const GET_SIMPLE_CHARACTERS = gql`
  query GetSimpleCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
        prev
      }
      results {
        id
        name
        status
        image
      }
    }
  }`;

export const GET_COMPLEX_CHARACTER = gql`
 query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      origin {
        name
      }
      image
    }
  }
`;
