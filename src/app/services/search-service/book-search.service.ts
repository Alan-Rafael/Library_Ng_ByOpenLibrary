import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../modelos/Book';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {

  constructor() { }

  private searchResultsSource = new BehaviorSubject<string>('');
  searchResults = this.searchResultsSource.asObservable();

  setSearchBooks(query: string) {
    this.searchResultsSource.next(query);
  }
}
