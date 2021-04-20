import { Country } from "./country";
export interface ICity {
    id?: number;
    name?: string;
    countryCode?: string;
    country?: Country;
    district?: string;
    population?: number;
}

export class City implements ICity {
    constructor(
        public id?: number,
        public name?: string,
        public countryCode?: string,
        public country?: Country,
        public district?: string,
        public population?: number
    ) {}
    
}