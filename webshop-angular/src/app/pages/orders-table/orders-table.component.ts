import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit {

  allData: any[] = [];
  changeCounter: number = 0;
  productsQuantityArr: [] = [];
  totalPriceArr: [] = [];
  orderDetails: any[] = [];
  statusArray: string[] = ['received', 'processed', 'shipped', 'delivered'];
  filterKey: string = 'status';
  filterPhrase1: string = '';
  filterPhrase2: string = '';
  filterPhrase3: string = '';
  selectedRow: number = -1;

  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.orderService.readAll();
    this.orderService.list.subscribe(orders => {
      this.allData = orders[0];
      this.orderDetails = orders[1];
      this.totalPriceArr = orders[2];
      this.productsQuantityArr = orders[3];
    }
    )
  }

  onDelete(picked: any) {
    const id = picked.order;
    this.orderService.deleteBS(picked.orderDetailsId);
    document.getElementById(`expandRow${id}`).classList.add("show");
  }

  onStatusChange(order: any) {
    order.status = 'deleted';
    this.orderService.update(order).subscribe(
      response => {
        this.changeCounter++;
      },
      err => console.error(err),
    )
  }

  onChange(value, order) {
    order.status = value;
    this.orderService.update(order).subscribe(
      response => {
        this.changeCounter++;
      },
      err => console.error(err),
    )
  }

  selectedRowFunc(id) {
    if (this.selectedRow == -1) {
      this.selectedRow = id;
    } else {
      this.selectedRow = -1
    }
  }

  setSorterKey() {
    if (this.filterPhrase1 == '') {
      this.filterPhrase1 = 'received';
      this.filterPhrase2 = 'processed';
      this.filterPhrase3 = 'shipped';
    } else {
      this.filterPhrase1 = '';
      this.filterPhrase2 = '';
      this.filterPhrase3 = '';
    }
  }

}
