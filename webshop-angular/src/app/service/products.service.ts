import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  routeUrl: string = '';

  constructor(private http: HttpClient,
    private router: Router) {
    if (this.router.url == '/products') {
      this.routeUrl = 'http://localhost:3000/admin/products'
    }
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.routeUrl)
  }

  delete(id): Observable<Product> {
    return this.http.delete<Product>(`${this.routeUrl}/${id}`)
  }
}
