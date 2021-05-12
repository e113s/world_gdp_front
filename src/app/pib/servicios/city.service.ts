import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { City, ICity } from '../modelos/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private url = "https://world-gdp.herokuapp.com/worldgdp/api/cities/";

  constructor(private http : HttpClient) { }

  headers = {'Content-type': 'application/json'}

  public getCities(countryCode: string, pageNo: number) : Observable<any>{
    return this.http.get<any>(this.url + countryCode + "?pageNo=" + pageNo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public addCity(countryCode: string, city: City) : Observable<any>{
    const body = JSON.stringify(city);
    console.log("Body: ", body);
    return this.http.post(this.url + countryCode, body, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public deleteCity(cityId: number) : Observable<any>{
    return this.http.delete(this.url + cityId, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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
