import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Function to make the GET call
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/product/get");
  }

  getProductById(id:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/product/get/"+id);
  }

  addProduct(name:string){
    let body={"name" : name}
    return this.http.post(this.apiUrl + "/product/add", body)
  }

  updateProduct(name:string, id : string){
    let body={"name" : name}
    return this.http.put(this.apiUrl + "/product/update/"+id, body)
  }

  deleteProductById(id:string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/product/delete/"+id);
  }
}
