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

  constructor(
    private orderService: OrderService
  ) {
    this.orderService.getAll().subscribe(orders => {
      this.allData = orders[0];
      this.orderDetails = orders[1];
      this.totalPriceArr = orders[2];
      this.productsQuantityArr = orders[3];
    }
    );
  }

  ngOnInit() {

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

  onDelete(picked: any) {
    this.orderService.delete(picked.orderDetailsId).subscribe(
      response => {
        let index = this.orderDetails.indexOf(picked);
        this.orderDetails.splice(index, 1);
        this.changeCounter++;
      },
      err => console.error(err)
    )
  }


  toggleView(id) {
    document.getElementById(`expandRow${id}`).classList.toggle("show");
    document.getElementById(`expandRow${id}`).classList.toggle("noShow");
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


}
