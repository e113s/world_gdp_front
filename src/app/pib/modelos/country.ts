import { Injectable } from "@angular/core";
import { City } from "./city";

export interface ICountry {
    code?: string;
    name?: string;
    localName?: string;
    capital?: City;
    continent?: string;
    region?: string;
    headOfState?: string;
    governmentForm?: string;
    indepYear?: string;
    surfaceArea?: number;
    population?: number;
    lifeExpectancy?: number;
    gnp?: number;
    code2?: string;
}

export class Country implements ICountry {
    constructor(
        public code?: string,
        public name?: string,
        public localName?: string,
        public capital?: City,
        public continent?: string,
        public region?: string,
        public headOfState?: string,
        public governmentForm?: string,
        public indepYear?: string,
        public surfaceArea?: number,
        public population?: number,
        public lifeExpectancy?: number,
        public gnp?: number,
        public code2?: string
    ) { }
}