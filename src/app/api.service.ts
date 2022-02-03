import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get("https://fakestoreapi.com/products/")
    .pipe(catchError((error) => {
      console.log(error);
      return throwError("Error");
    }))
  }
}
