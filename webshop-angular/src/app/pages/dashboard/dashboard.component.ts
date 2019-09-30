import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/service/products.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allUser: User[] = [];
  allProduct: Product[] = [];

  constructor(
    private productService: ProductsService,
    private userService: UserService) {
    this.productService.getAll().subscribe(products => this.allProduct = products);
    this.userService.getAll().subscribe(users => this.allUser = users);
  }

  ngOnInit() {
  }

  numberOfCustomers() {
    return this.allUser.filter(item => item.role == 'customer').length;
  }

  numberOfAdmins() {
    return this.allUser.filter(item => item.role == 'administrator').length;
  }

  numberOfProducts() {
    return this.allProduct.length;
  }



}
