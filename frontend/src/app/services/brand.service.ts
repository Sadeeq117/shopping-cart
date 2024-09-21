import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Function to make the GET call
  getBrands(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/brand/get");
  }

  getBrandById(id:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/brand/get/"+id);
  }

  addBrand(name:string){
    let body={"name" : name}
    return this.http.post(this.apiUrl + "/brand/add", body)
  }

  updateBrand(name:string, id : string){
    let body={"name" : name}
    return this.http.put(this.apiUrl + "/brand/update/"+id, body)
  }

  deleteBrandById(id:string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/brand/delete/"+id);
  }
}
