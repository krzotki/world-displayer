import React from 'react';
import {useQuery} from '@apollo/client'
import {GET_COUNTRIES_BY_CONTINENT} from '../GraphQL/Queries/GetCountries'
import {CountriesData, Country, State} from '../Interfaces/Country'


interface VariablesData {
    continentCode: string | undefined
}

interface Props {
    continentCode: string | undefined
    clickHandler: (country: Country) => void
    selectedCountry: Country | undefined
}

const ListOfCountries: React.FC<Props> = (props) => {
    const {loading, data, error} = useQuery<CountriesData, VariablesData>(GET_COUNTRIES_BY_CONTINENT, {
        variables: {
            continentCode: props.continentCode
        }
    });

    return (
        <ul className='col-4 h-100 list-group overflow-auto'>
            {data && data.countries.map(country => {
                  const itemClass = ['list-group-item'];
                  if(props && props.selectedCountry && props.selectedCountry.code === country.code) itemClass.push('active');
  
                  return (
                      <li 
                          onClick={() => props.clickHandler(country)} 
                          key={country.code}
                          className={itemClass.join(' ')}
                      >
                          {country.name}
                      </li>
                  );
            })}
        </ul>
    );
};

export default ListOfCountries;