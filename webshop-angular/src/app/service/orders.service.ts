import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.entity = 'orders'
  }
}
