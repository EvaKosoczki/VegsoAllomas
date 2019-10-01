import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-first-report',
  templateUrl: './first-report.component.html',
  styleUrls: ['./first-report.component.css']
})
export class FirstReportComponent implements OnInit {
  allOrder: any[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe(orders => {
      this.allOrder = orders[4];
      console.log('Orders: ', orders[4]);
    });
  }

  ngOnInit() {
  }

}
