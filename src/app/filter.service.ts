import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  public category = new BehaviorSubject<string>("");
  public search = new BehaviorSubject<string>("");

  constructor() { }
}
