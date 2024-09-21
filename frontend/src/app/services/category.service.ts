import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Function to make the GET call
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/category/get");
  }

  getCategoryById(id:string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/category/get/"+id);
  }

  addCategory(name:string){
    let body={"name" : name}
    return this.http.post(this.apiUrl + "/category/add", body)
  }

  updateCategory(name:string, id : string){
    let body={"name" : name}
    return this.http.put(this.apiUrl + "/category/update/"+id, body)
  }

  deleteCategoryById(id:string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/category/delete/"+id);
  }

  

 
}
