import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../modelos/Book';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {
  private filterBookssourceBhs = new BehaviorSubject<any[]>([]);
  filterBooks = this.filterBookssourceBhs.asObservable();

  setFiltersBooks(books: Book[]){
    this.filterBookssourceBhs.next(books);
  }

  constructor() { }
}
