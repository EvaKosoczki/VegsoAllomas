import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../model/brand';

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

  getOne(id): Observable<any> {
    let url: string = this.getUrl()
    return this.http.get(`${url}/${id}`)
  }

  delete(id): Observable<any> {
    let url: string = this.getUrl()
    return this.http.delete(`${url}/${id}`)
  }

  create(data): Observable<any> {
    let url: string = this.getUrl()
    return this.http.post<any>(url, data)
  }

  update(data): Observable<any> {
    let url: string = this.getUrl()
    return this.http.put<any>(url, data)
  }

  updateID(id, data): Observable<any> {
    let url: string = this.getUrl()
    return this.http.put<any>(`${url}/${id}`, data)
  }

}
