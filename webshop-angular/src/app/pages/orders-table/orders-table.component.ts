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

  allData: Order[] = [];
  changeCounter: number = 0;

  constructor(
    private orderService: OrderService
  ) {
    this.orderService.getAll().subscribe(orders => this.allData = orders);
  }

  ngOnInit() {
  }

  onDelete(picked: Order) {
    this.orderService.delete(picked.orderId).subscribe(
      response => {
        let index = this.allData.indexOf(picked);
        this.allData.splice(index, 1);
        this.changeCounter++;
      },
      err => console.error(err)
    )
  }


  toggleView(id) {
    document.getElementById(`expandRow${id}`).classList.toggle("show");
  }

}
