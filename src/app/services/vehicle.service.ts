import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://vpic.nhtsa.dot.gov/api';

  constructor(private http: HttpClient) { }

  getVehicleBrands(): Observable<any> {
    const url = `${this.baseUrl}/vehicles/GetAllMakes?format=json`;
    return this.http.get<any>(url);
  }
  getVehicleTypes(brandId: string): Observable<any> {
    const url = `${this.baseUrl}/vehicles/GetVehicleTypesForMakeId/${brandId}?format=json`;
    return this.http.get<any>(url);
  }

  getVehicleModels(brandId: string): Observable<any> {
    const url = `${this.baseUrl}/vehicles/GetModelsForMakeId/${brandId}?format=json`;
    return this.http.get<any>(url);
  }
}
