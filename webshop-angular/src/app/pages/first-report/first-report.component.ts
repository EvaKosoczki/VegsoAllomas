import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-first-report',
  templateUrl: './first-report.component.html',
  styleUrls: ['./first-report.component.css']
})
export class FirstReportComponent implements OnInit {
  allOrder: any[] = [];
  sumOrderValue: number = 0;
  sumOrders: number = 0;
  orderKey: string = '';
  orderDirection: number = 1;

  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe(orders => {
      for (let k in orders[4]) {
        if (!orders[4][k]) {
          continue;
        }
        this.sumOrderValue += orders[4][k].orderValue;
        this.sumOrders += orders[4][k].numberOfOrders;
      }
      this.allOrder = orders[4];
      console.log('Orders: ', orders[4]);
    });
  }

  ngOnInit() {
  }

  setSorterKey(key: string): void {
    if (key === this.orderKey) {
      this.orderDirection = this.orderDirection === -1 ? 1 : -1;
    } else {
      this.orderDirection = 1;
    }

    this.orderKey = key;
  }
}
