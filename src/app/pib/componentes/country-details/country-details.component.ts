import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../../servicios/city.service';
import { CountryServiceService } from '../../servicios/country-service.service';
import { LanguageService } from '../../servicios/language.service';
import { Chart } from 'chart.js';
import { City } from '../../modelos/city';
import { Country, ICountry } from '../../modelos/country';
import { CountryLanguage, ICountryLanguage  } from '../../modelos/country-language';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  countryCode: string;
  country: any = {};
  count: number;
  classes = [];
  class1: string = "col-md-3";
  class2: string = "flag-icon";
  class3: string = "flag-icon-";
  cities: any = [];
  languages: any = [];
  chart = [];
  yearChart = [];
  valueChart = [];
  dataAvailable: boolean;
  submitted = false;
  pageNoCities = 1;
  pageNoLanguages = 1;
  flagCities = false;
  flagLanguages = false;
  citiesCount: number;

  //City Attributes Modal
  cityName = "";
  cityDistrict = "";
  cityPopulation = 0;

  //Language Attribute Modal
  languageFlag: boolean;
  languageName = "";
  languageIsOfficial: string;
  languagePercentage = 0.0;

  //Model City && Language
  language: ICountryLanguage;
  cityModel: City;
  languageModel: CountryLanguage;
  
  

  constructor(private countryService: CountryServiceService,
    private route: ActivatedRoute,
    private cityService: CityService,
    private languageService: LanguageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.countryCode = params.get('code');
    });
  
    this.loadCountryDetails();
  }

  private requestParams(search: string): any {
    let params: any = {};

    if (search) {
      params[`code`] = search;
    }

    return params;
  }

  private loadCountryDetails() {
    const params = this.requestParams(this.countryCode);
    this.countryService.getCountries(params).subscribe((data: {}) => {
      this.country = data;
      this.count = this.country.count;
      this.class3 += this.country.list[0].code2;
      this.classes.push(this.class1);
      this.classes.push(this.class2);
      this.classes.push(this.class3.toLowerCase());
      this.loadCities(this.country.list[0].code);
      this.loadLanguages(this.country.list[0].code);
      this.loadGdp(this.country.list[0].code);
    });
  }

  private loadCities(countryCode: string) {
    this.cityService.getCities(countryCode, this.pageNoCities).subscribe(data => {
      this.cities = data;
    });

  }

  private loadLanguages(countryCode: string) {
    this.languageService.getLanguages(countryCode, this.pageNoLanguages).subscribe(data => {
      this.language = data;
    })
  }

  public saveCity(){
    this.submitted = true;
    this.cityModel = new City(undefined,this.cityName, this.countryCode, undefined, this.cityDistrict, this.cityPopulation);
    this.cityService.addCity(this.countryCode, this.cityModel).subscribe(data => {
      console.log("REST Response: ", data);
    });

    this.loadCities(this.countryCode);
  }

  public deleteCity(cityId: number){
    console.log('City ID parameter: ', cityId);
    this.cityService.deleteCity(cityId).subscribe(data => {
      console.log("REST response: ", data);
    });


    this.loadCities(this.countryCode);
  }

  
  public addLanguage(){

    console.log("Country Code: ", this.countryCode);
    console.log("Name: ", this.languageName);
    console.log("Percentage: ", this.languagePercentage); 

    if(this.languageFlag == true){
      this.languageIsOfficial = "T";
      console.log("IsOfficial: ", this.languageIsOfficial);
    } else {
      this.languageIsOfficial = "F";
      console.log("IsOfficial: ", this.languageIsOfficial);
    }

    this.languageModel = new CountryLanguage(undefined, this.countryCode, this.languageName, this.languageIsOfficial, this.languagePercentage);
    this.languageService.addLanguage(this.countryCode, this.languageModel).subscribe(data => {
      console.log("REST response: ", data);
    });

    this.loadCities(this.countryCode);
  }
  

  public deleteLanguage(nameLanguage: string){
    console.log("Lenguaje a borrar: ", nameLanguage);
    this.languageService.deleteLanguage(this.countryCode,nameLanguage).subscribe(data => {
      console.log("REST response: ", data);
    });

    this.loadLanguages(this.countryCode);
  }

  public loadMoreCities(){
    this.pageNoCities += 1;

    /*if(this.cities.length == 4){
      this.flagCities = true;
    } else {
      this.flagCities = false;
      this.loadCities(this.countryCode);
    }*/

    this.loadCities(this.countryCode);
  }

  public loadMoreLanguage(){
    this.pageNoLanguages += 1;

    this.loadLanguages(this.countryCode);
  }

  public handlePagination(event : number): void {
    this.pageNoCities = event;
    this.loadCities(this.countryCode);
  }

  private loadGdp(countryCode: string) {
    this.countryService.getGDP(countryCode).subscribe(data => {
      this.dataAvailable = true;

      if (data) {
        this.dataAvailable = false;
        for (let i = 0; i < data.length; i++) {
          this.yearChart.push(data[i].year);
          this.valueChart.push(data[i].value);
        }

        this.yearChart = this.yearChart.reverse();
        this.valueChart = this.valueChart.reverse();

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.yearChart,
            datasets: [
              {
                label: 'PIB',
                data: this.valueChart,
                borderColor: '#3cba9f',
                fill: true
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true,
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Valor en USD'
                }
              }],
            }
          }
        });
      }


    })
  }
}