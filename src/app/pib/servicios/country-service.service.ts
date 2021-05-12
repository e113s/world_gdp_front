import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Country } from '../modelos/country';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {
  private url = "https://world-gdp.herokuapp.com/worldgdp/api/countries";

  constructor(private http: HttpClient) { }

  headers = {'Content-type': 'application/json'}

  public getCountries(params: any): Observable<any>{
    return this.http.get<any>(this.url, {params})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getGDP(countryCode: string): Observable<any>{
    return this.http.get<any>(this.url + '/' + countryCode + '/gdp')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getContinents(): Observable<any>{
    return this.http.get<any>(this.url + "/continents")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getRegions(): Observable<any>{
    return this.http.get<any>(this.url + "/regions")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getHeadStates(): Observable<any>{
    return this.http.get(this.url + "/headStates")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public getGovernment(): Observable<any>{
    return this.http.get<any>(this.url + "/government")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public editCountry(countryCode: string, country: Country) {
    const body = JSON.stringify(country);
    return this.http.post(this.url + "/" + countryCode, body, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error){
    let errorMessage = "";
    if(error.error instanceof ErrorEvent)
    {
      errorMessage = error.error.message;
      
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
