import { Injectable } from '@angular/core';
import {Observer, Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class LibraryService {
  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }
  getBooks(formData: any):Observable<any>{
    console.log(formData)
    const url = `${this.url}/authors`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url,formData,httpOptions);
  }


}
