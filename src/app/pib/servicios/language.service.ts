import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CountryLanguage } from '../modelos/country-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private url = "http://localhost:4000/worldgdp/api/languages/";

  constructor(private http: HttpClient) { }

  headers = {'Content-type': 'application/json'}

  public getLanguages(countryCode : string, pageNo: number) : Observable<any>{
    return this.http.get<any>(this.url + countryCode + "?pageNo=" + pageNo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public addLanguage(countryCode: string, language: CountryLanguage){
    const body = JSON.stringify(language);
    console.log("Body: ", body);
    return this.http.post(this.url + countryCode, body, {'headers': this.headers})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public deleteLanguage(countryCode: string, nameLanguage: string){
    return this.http.delete(this.url + countryCode + "/language/" + nameLanguage)
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
