import { Component, OnInit } from '@angular/core';
import { FilterService } from "../filter.service";
import { ApiService } from "../api.service";
import { CartService } from "../cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public itemList: any;
  public filteredList: any;
  public searchTerm: string = "";
  public category: string = "";
  public isFiltered = false;
  public showDetail = false;
  public itemDetail: any;
  public noItem = false;

  constructor(private filterService: FilterService, private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    let unsub = this.apiService.getProduct().subscribe(res => {
      this.itemList = res;
      this.filteredList = res;
      this.itemList.forEach((item: any) => {
        item.quantity = 1;
        if(item.category === "men's clothing" || item.category === "women's clothing") {
          item.category = "fashion";
        }
      })
    });

    let unsub1 = this.filterService.category.subscribe(res => {
      if(this.showDetail) {
        this.showDetail = false;
      }
      this.category = res;
      if(this.category != "" && this.itemList != undefined) {
        this.isFiltered = true;
        this.filteredList = this.itemList.filter((item: any) => {
          if(item.category == this.category) {
            return item;
          }
        });
      } else if(this.category == "" && this.itemList != undefined) {
        this.isFiltered = false;
        this.filteredList = this.itemList;
      }
    });

    let unsub2 = this.filterService.search.subscribe(term => {
      this.searchTerm = term;
    })

    setTimeout(() => {
      unsub.unsubscribe();
      unsub1.unsubscribe();
      unsub2.unsubscribe();
    }, 180000);

  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  allItems() {
    this.filteredList = this.itemList;
    this.isFiltered = false;
    this.showDetail = false;
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  getDetail(event: any) {
    this.toggleDetail();
    if(this.showDetail) {
      this.itemList.forEach((item: any) => {
        if(item.id == event.target.id) {
          this.itemDetail = item;
        }
      });
    }
  }

  noItemFound() {
    if(this.itemList != undefined) {
      let itemFound = document.querySelectorAll(".overflow");
      if(itemFound.length == 0) {
        this.noItem = true;
      } else {
        this.noItem = false;
      }
    }
    return false;
  }
}
