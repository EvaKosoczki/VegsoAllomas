import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.css']
})
export class OrdersNewComponent implements OnInit {


  order: Order = new Order();
  originalName: string = '';
  replacedName: string = '';

  constructor(private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(ev: Event) {
    ev.preventDefault();
    this.orderService.update(this.order)
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
