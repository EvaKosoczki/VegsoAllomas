import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService extends BaseService{

  constructor(http:HttpClient) { 
    super(http);
    this.entity='brands';
  }
  getBrands(): Observable<any> {
    let url: string = this.getUrl()
    return this.http.get<any>(`${url}`);
  }
}
