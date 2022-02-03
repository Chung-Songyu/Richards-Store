import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";

import { FilterService } from "../filter.service";
import { CartService } from "../cart.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm: string = "";

  constructor(private filterService: FilterService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    let unsub = this.cartService.getProducts().subscribe(res => {
      let cartTotal: number = 0;
      res.forEach((item: any) => {
        cartTotal += item.quantity;
      });
      this.totalItem = cartTotal;
    })

    setTimeout(() => {
      unsub.unsubscribe();
    }, 180000);
  }

  search(event: KeyboardEvent) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterService.search.next(this.searchTerm);
  }

  clear() {
    setTimeout(() => {
      if(this.searchTerm == "") {
        this.filterService.search.next(this.searchTerm);
      }
    }, 0);
  }

  category(catName: string) {
    this.searchTerm = "";
    this.filterService.search.next(this.searchTerm);
    this.router.navigate(['/']);
    setTimeout(() => {
      this.filterService.category.next(catName);
    }, 1000);
  };
}
