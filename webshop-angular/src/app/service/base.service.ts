import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  routeUrl: string = '';
  entity: string;
  baseUrl = 'http://localhost:3000/api/'
  constructor(protected http: HttpClient) { }

  getUrl(): any {
    let url = `${this.baseUrl}${this.entity}`;
    return url;
  }
  getAll(): Observable<any> {
    let url: string = this.getUrl()
    return this.http.get(url)
  }

  delete(id): Observable<any> {
    let url: string = this.getUrl()
    return this.http.delete(`${url}/${id}`)
  }
}
