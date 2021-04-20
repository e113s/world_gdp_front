import { Country } from "./country";

export interface ICountryLanguage {
    country?: Country;
    countryCode?: string;
    language?: string;
    isOfficial?: string;
    percentage?: number;
}

export class CountryLanguage implements ICountryLanguage{
    constructor(
        public country?: Country,
        public countryCode?: string,
        public language?: string,
        public isOfficial?: string,
        public percentage?: number
    ){}
}
