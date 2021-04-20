import { Component, ElementRef, OnInit } from '@angular/core';
import { CountryServiceService } from '../../servicios/country-service.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../modelos/country';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {

  countryDetails: any = [];
  governmentForms: any = [];
  capitalObject: any = {};
  countryCode: string;

  //Variable para crear objeto country
  head_of_state: string;
  governmentFormSelected: string;
  population_new: number;
  life_expectancy: number;

  constructor(
    private countryService: CountryServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.countryCode = param.get('code');
    });

    this.loadCountryDetails();
    this.loadGovernmentForms();
  }

  private requestParams(search: string): any {
    let params: any = {};

    if (search) {
      params[`code`] = search;
    }

    return params;
  }

  private loadCountryDetails(){
    const parameters = this.requestParams(this.countryCode);
    this.countryService.getCountries(parameters).subscribe(data => {
      this.countryDetails = data.list[0];
      this.capitalObject = data.list[0].capital;
    });
  }

  private loadGovernmentForms(){
    this.countryService.getGovernment().subscribe(data => {
      this.governmentForms = data;
    });
  }

  public confirm(){
    this.getValues();
    const country = new Country(undefined, this.countryDetails.name, this.countryDetails.localName, 
      this.capitalObject, this.countryDetails.continent, this.countryDetails.region, this.head_of_state,
      this.governmentFormSelected, this.countryDetails.indepYear, this.countryDetails.surfaceArea,
      this.population_new, this.life_expectancy, undefined, undefined);

    console.log("Country Object to Save: ", country);
    console.log("Datos Guardados con exito!");

    this.countryService.editCountry(this.countryCode, country).subscribe(response => {
      console.log("REST response: ", response);
    })
  }

  getValues(){
    this.head_of_state = (<HTMLInputElement>document.getElementById("headOfStateInput")).value;
    this.population_new = +(<HTMLInputElement>document.getElementById("pupulationInput")).value;
    this.life_expectancy = +(<HTMLInputElement>document.getElementById("lifeExpectancyInput")).value;
  }
}
