import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-second-report',
  templateUrl: './second-report.component.html',
  styleUrls: ['./second-report.component.css']
})
export class SecondReportComponent implements OnInit {
  allOrder: any[] = [];
  sumOrderValue: number = 0;
  orderKey: string = '';
  orderDirection: number = 1;
  filterPhrase: string = '';

  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe(orders => {
      for (let k in orders[4]) {
        if (!orders[5][k]) {
          continue;
        }
        this.sumOrderValue += orders[5][k].orderValue;
      }
      this.allOrder = orders[5];
      console.log('Orders: ', orders[5]);
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
