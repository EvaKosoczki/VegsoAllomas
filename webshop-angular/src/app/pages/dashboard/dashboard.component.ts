import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/service/products.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allUser: User[] = [];
  allProduct: Product[] = [];
  allOrder: Order[] = [];

  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private orderService: OrderService) {
    this.productService.getAll().subscribe(products => this.allProduct = products);
    this.userService.getAll().subscribe(users => this.allUser = users);
    this.orderService.getAll().subscribe(orders => {
      this.allOrder = orders[0];
    })
  }

  ngOnInit() {
  }

  //Users:
  numberOfCustomers() {
    return this.allUser.filter(item => item.role == 'customer').length;
  }

  numberOfAdmins() {
    return this.allUser.filter(item => item.role == 'administrator').length;
  }

  //Products:
  numberOfProducts() {
    return this.allProduct.length;
  }

  activeProducts() {
    return this.allProduct.filter(item => item.status !== 'deleted').length;
  }

  //Orders:
  numberOfOrders() {
    return this.allOrder.length;
  }

  activeOrders() {
    return this.allOrder.filter(item => item.status !== 'deleted').length;
  }

}
