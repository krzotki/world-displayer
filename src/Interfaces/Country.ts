export interface State {
    name: string
}

export interface Country {
    code: string  
    name: string
    capital: string
    states: [State]
    currency: string
    native: string
    phone: string
}

export interface CountriesData {
    countries: [Country]
}