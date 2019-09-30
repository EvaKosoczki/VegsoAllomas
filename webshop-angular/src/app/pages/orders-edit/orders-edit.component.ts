import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit {

  oneOrder: Order;
  orderId: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private ar: ActivatedRoute

  ) {
    this.ar.params.forEach(
      params => {
        this.orderId = params.id
        this.orderService.getOne(this.orderId).subscribe(
          data => {
            this.oneOrder = data[0];
            console.log(this.oneOrder);
          }
          
        )
      }
    )
  }

  ngOnInit() {
  }

  onSubmit(ev: Event) {
    ev.preventDefault();
    this.orderService.update(this.oneOrder)
      .subscribe(
        response => {
          this.router.navigateByUrl("/orders");
        },
        err => {
          this.router.navigateByUrl("/orders");
        })
  }
  onCancel() {
    this.router.navigateByUrl("/orders");
  }


}
