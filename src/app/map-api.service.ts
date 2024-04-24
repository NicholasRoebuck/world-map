import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MapApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  countryData = new Subject<any>();

  fetchCountryData(countryID: string) {
    const api = `${this.apiUrl}${countryID}?format=json`;
    return this.http.get(api);
  }
  
  setCountryData(countryID: string): Observable<any>{
    this.fetchCountryData(countryID).subscribe((res: any) => {
      const countryDataValue = res[1];
      const apiResults = {
        name: countryDataValue[0].name,
        capitalCity: countryDataValue[0].capitalCity,
        region: countryDataValue[0].region.value,
        incomeLevel: countryDataValue[0].incomeLevel.value,
        latitude: countryDataValue[0].latitude,
        longitude: countryDataValue[0].longitude
      }
      
      this.countryData.next(apiResults);
      this.countryData = new Subject;

    })
    return this.countryData.asObservable();
  }

}
