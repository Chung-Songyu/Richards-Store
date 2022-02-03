import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cartItemList: any = [];
  public itemList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.itemList.asObservable();
  }

  addToCart(product: any) {
    if(this.cartItemList.length == 0) {
      this.cartItemList.push(product);
      this.itemList.next(this.cartItemList);
    } else {
      let dupe = false;
      this.cartItemList.forEach((item: any) => {
        if(item.id == product.id) {
          dupe = true;
          item.quantity += 1;
          this.itemList.next(this.cartItemList);
        }
      });
      if(!dupe) {
        this.cartItemList.push(product);
        this.itemList.next(this.cartItemList);
      }
    }
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.price * item.quantity;
    })
    return grandTotal;
  }

  removeSingleItem(product: any) {
    this.cartItemList.map((item: any, index: number) => {
      if(product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.itemList.next(this.cartItemList);
  }

  removeAllItems() {
    this.cartItemList = [];
    this.itemList.next(this.cartItemList);
  }
}
