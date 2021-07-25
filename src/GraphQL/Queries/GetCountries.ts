import {gql} from '@apollo/client'

export const GET_COUNTRIES_BY_CONTINENT = gql`
    query ($continentCode: String) {
        countries(filter: {
        continent: {eq: $continentCode}
        }) {
            name,
            code,
            capital,
            currency,
            phone,
            native,
            states {
                name
            }
        }
    }
`;
