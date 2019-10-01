import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/service/basket.service';

@Component({
  selector: 'app-baskets-table',
  templateUrl: './baskets-table.component.html',
  styleUrls: ['./baskets-table.component.css']
})
export class BasketsTableComponent implements OnInit {
  allData: any[] = [];
  changeCounter: number = 0;
  productsQuantityArr: [] = [];
  totalPriceArr: [] = [];
  basketDetails: any[] = [];

  constructor(
    private basketService: BasketService
  ) {
    this.basketService.getAll().subscribe(baskets => {
      this.allData = baskets[0];
      this.basketDetails = baskets[1];
      this.totalPriceArr = baskets[2];
      this.productsQuantityArr = baskets[3];
    }
    );
  }

  ngOnInit() {

  }


  toggleView(id) {
    document.getElementById(`expandRow${id}`).classList.toggle("show");
  }

  onDelete(picked: any) {
    this.basketService.update(picked).subscribe(
      response => {
        this.changeCounter++;
      },
      err => console.error(err),
    )
  }

  clearBasket(item){
    this.basketService.delete(item.basketId).subscribe(
      response => {
        this.changeCounter++;
      },
      err => console.error(err)
    )
  }

}
