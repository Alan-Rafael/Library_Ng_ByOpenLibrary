import { Component, OnInit } from '@angular/core';
import { BookSearchService } from '../../services/search-service/book-search.service';
import { Book } from '../../modelos/Book';
import {ActivatedRoute, Route, RouterLink} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FilterServiceService } from '../../services/filters-service/filter-service.service';

@Component({
  selector: 'app-books-when-search',
  imports: [RouterLink, NgFor,NgIf],
  templateUrl: './books-when-search.component.html',
  styleUrl: './books-when-search.component.scss'
})
export class BooksWhenSearchComponent implements OnInit {
  searchQuery: Book[] = [];
  
  constructor(
    private searchService:BookSearchService,
    private filterSearchService: FilterServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchService.searchResults.subscribe((books) => {
      this.searchQuery = books.length > 0 ? books : [];
    });

    this.filterSearchService.filterBooks.subscribe((books) => {
      this.searchQuery = books.length > 0 ? books : [];
    });
  }

}
