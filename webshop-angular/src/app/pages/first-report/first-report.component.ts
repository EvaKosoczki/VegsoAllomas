import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-first-report',
  templateUrl: './first-report.component.html',
  styleUrls: ['./first-report.component.css']
})
export class FirstReportComponent implements OnInit {
  allOrder: any[] = [];
  changeCounter: number = 0;
  productsQuantityArr: [] = [];
  totalPriceArr: [] = [];
  orderDetails: any[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe(orders => {
      this.allOrder = orders[0];
      this.orderDetails = orders[1];
      this.totalPriceArr = orders[2];
      this.productsQuantityArr = orders[3];
      console.log('Orders: ', orders);
    });
  }

  ngOnInit() {
  }

}
