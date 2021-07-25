import React from 'react';
import {useQuery} from '@apollo/client'
import {GET_CONTINENTS} from '../GraphQL/Queries/GetContinents'
import {Continent, ContinentsData} from '../Interfaces/Continent'


interface Props {
    clickHandler: (continent: Continent) => void
    selectedContinent: Continent | undefined
}

const ListOfContinents: React.FC<Props> = (props) => {
    const {loading, data, error} = useQuery<ContinentsData>(GET_CONTINENTS);

    return (
        <ul className='col-4 h-100  list-group overflow-auto'>
            {data && data.continents.map(continent => {
                const itemClass = ['list-group-item'];
                if(props.selectedContinent && props.selectedContinent.code === continent.code) itemClass.push('active');

                return (
                    <li 
                        onClick={() => props.clickHandler(continent)} 
                        key={continent.code}
                        className={itemClass.join(' ')}
                    >
                        {continent.name}
                    </li>
                );
            })}
        </ul>
    );
};

export default ListOfContinents;