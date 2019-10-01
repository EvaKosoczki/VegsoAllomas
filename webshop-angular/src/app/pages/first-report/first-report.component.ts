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

  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe(orders => {
      for (let k in orders[4]) {
        if (!orders[4][k]) {
          continue;
        }
        console.log(orders[4][k].orderValue);
        this.sumOrderValue += orders[4][k].orderValue;
      }
      this.allOrder = orders[4];
      console.log('Orders: ', orders[4]);
    });
  }

  ngOnInit() {
  }

  getTotal(arr) {
    return arr.reduce((sum, curr) => sum + curr.Total, 0);
  }

}
