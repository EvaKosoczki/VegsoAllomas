import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/service/basket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-baskets-table',
  templateUrl: './baskets-table.component.html',
  styleUrls: ['./baskets-table.component.css']
})
export class BasketsTableComponent implements OnInit {
  list: [] = [];
  changeCounter: number = 0;
  allData: [] = [];
  basketDetails: [] = [];
  totalPriceArr: [] = [];
  productsQuantityArr: [] = [];
  selectedRow: number = -1;


  constructor(
    private basketService: BasketService
  ) {
  }

  ngOnInit() {
    this.basketService.readAll();
    this.basketService.list.subscribe(
      data => {
        this.list = data;
        this.allData = data[0];
        this.basketDetails = data[1];
        this.totalPriceArr = data[2];
        this.productsQuantityArr = data[3];
      }
    )
  }


  toggleView(id) {
    document.getElementById(`expandRow${id}`).classList.toggle("show");
  }

  onDelete(picked: any) {
    const id = picked.basket;
    this.basketService.updateBS(picked);
    document.getElementById(`expandRow${id}`).classList.add("show");
  }

  clearBasket(item) {
    this.basketService.deleteBS(item.basketId);
  }

  selectedRowFunc(id) {
    if (this.selectedRow == -1) {
      this.selectedRow = id;
    } else {
      this.selectedRow = -1
    }
  }
}
