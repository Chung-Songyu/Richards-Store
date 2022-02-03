import { Component, OnInit } from '@angular/core';

import { CartService } from "../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  public cartList: any = [];
  public grandTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    let unsub = this.cartService.getProducts().subscribe(res => {
      this.cartList = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });

    setTimeout(() => {
      unsub.unsubscribe();
    }, 180000);
  }

  removeSingleItem(item: any) {
    this.cartService.removeSingleItem(item);
  }

  removeAllItems() {
    this.cartService.removeAllItems();
  }
}
