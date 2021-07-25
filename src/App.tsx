import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import {onError} from '@apollo/client/link/error'
import ListOfContinents from './Components/ListOfContinents'
import ListOfCountries  from './Components/ListOfCountries'
import ListOfStates  from './Components/ListOfStates'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {CountriesData, Country, State} from './Interfaces/Country'
import {Continent, ContinentsData} from './Interfaces/Continent'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => {
      alert('Graphql error ' + message);
    })
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "https://countries.trevorblades.com/",
  })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

function App() {
  const [selectedContinent, setContinent] = useState<Continent>();
  const [selectedCountry, setCountry] = useState<Country>();
  const [selectedState, switchState] = useState<string>();

  const switchContinent = (continent: Continent) => {
    setCountry(undefined);
    setContinent(continent);
  };

  const switchCountry = (country: Country) => {
    switchState(undefined);
    setCountry(country);
  };

  return (
    <ApolloProvider client={client}>
      <div className='container h-100 w-100'>
        <div className='row h-75'>
          <ListOfContinents selectedContinent={selectedContinent} clickHandler={switchContinent}/>
          <ListOfCountries continentCode={selectedContinent?.code} clickHandler={switchCountry} selectedCountry={selectedCountry}/>
          <ListOfStates clickHandler={switchState} selectedState={selectedState} states={selectedCountry?.states}/>
        </div>
        <div className='row h-25 p-2 text-center'>
          {selectedContinent && 
            <div className='col-4'>
               <h3>{selectedContinent.name}</h3>
            </div>}
          {selectedCountry && 
            <div className='col-4'>
                <h3>{selectedCountry.name}</h3>
                <p>({selectedCountry.native})</p>
                <p>Capital: <strong>{selectedCountry.capital}</strong></p>
                <p>Currency: <strong>{selectedCountry.currency}</strong></p>
                <p>Phone: <strong>{selectedCountry.phone}</strong></p>
            </div>}
          {selectedState && <div className='col-4'>
              <h3>{selectedState}</h3>  
          </div>}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
