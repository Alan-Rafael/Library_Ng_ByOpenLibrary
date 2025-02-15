import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../modelos/Book';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {

  constructor() { }

  private searchResultsSource = new BehaviorSubject<any[]>([]);
  searchResults = this.searchResultsSource.asObservable();

  setSearchBooks(books: Book[]) {
    this.searchResultsSource.next(books);
    console.log('searchResultsSource', this.searchResultsSource);
  }
}
