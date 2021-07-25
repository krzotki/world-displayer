import React from 'react';
import {useQuery} from '@apollo/client'
import {GET_COUNTRIES_BY_CONTINENT} from '../GraphQL/Queries/GetCountries'
import {State} from '../Interfaces/Country'


interface Props {
    states: [State] | undefined,
    selectedState: string | undefined
    clickHandler: (selectedState: string) => void
}

const ListOfStates: React.FC<Props> = (props) => {

    return (
        <ul className='col-4 h-100 list-group overflow-auto'>
            {props.states && props.states.map(state => {
                  const itemClass = ['list-group-item'];
                  if(props && props.selectedState && props.selectedState === state.name) itemClass.push('active');
  
                  return (
                      <li 
                          onClick={() => props.clickHandler(state.name)} 
                          key={state.name}
                          className={itemClass.join(' ')}
                      >
                          {state.name}
                      </li>
                  );
            })}
        </ul>
    );
};

export default ListOfStates;