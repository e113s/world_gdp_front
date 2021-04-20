import { Component, OnInit } from '@angular/core';
import { Country } from '../../modelos/country';
import { CountryServiceService } from '../../servicios/country-service.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  public country : any = {};
  public gdp : any = [];
  public continents: any = [];
  public regions: any = [];
  count;
  search = "";
  selectedContinent = "";
  selectedRegion = "";
  pageNo = 1;

  constructor(private countryService: CountryServiceService) {}

  ngOnInit(): void {
    this.loadCountries();

    this.countryService.getContinents().subscribe((data) => {
      this.continents = data;
    });

    this.countryService.getRegions().subscribe( (data) => {
      this.regions = data;
    });
  } 
  
  private requestParams(continent: string, region: string, search: string, pageNo: number) : any{
    let params: any = {};
    //let params = new HttpParams();

    if(continent){
      params[`continent`] = continent;
    }

    if(region){
      params[`region`] = region;
    }

    if(search){
      params[`search`] = search;
    }

    if(pageNo){
      params[`pageNo`] = pageNo
    }

    return params;
  }

  private loadCountries(){
    const params = this.requestParams(this.selectedContinent, this.selectedRegion, this.search, this.pageNo);
    this.countryService.getCountries(params).subscribe((data: {}) => {
      this.country = data;
      this.count = this.country.count;
    });
  }

  public busqueda(){
    this.loadCountries();
  }

  public searchContinent(){
    console.log("Countrie Object: ", this.country);
    if(this.selectedContinent === "Todos"){
      this.selectedContinent = "";
    }

    this.loadCountries();
  }

  public searchRegion(){
    if(this.selectedRegion === "Todos"){
      this.selectedRegion = "";
    }

    this.loadCountries();
  }

  public handlePagination(event : number): void {
    this.pageNo = event;
    this.loadCountries();
  }
}
