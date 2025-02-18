import { Component, OnInit } from '@angular/core';
import { BookSearchService } from '../../services/search-service/book-search.service';
import { Book } from '../../modelos/Book';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FilterServiceService } from '../../services/filters-service/filter-service.service';
import { BooksService } from '../../services/book-service/books.service';

@Component({
  selector: 'app-books-when-search',
  imports: [RouterLink, NgFor,NgIf],
  templateUrl: './books-when-search.component.html',
  styleUrl: './books-when-search.component.scss'
})
export class BooksWhenSearchComponent implements OnInit {
  searchQuery: Book[] = [];
  currentPage: number = 10;
  totalPages: number = 1;
  currentSearchTerm: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private filterSearchService: FilterServiceService,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const query = params.get('query');      
      if (query) {
        this.currentSearchTerm = query;
        this.currentPage = 1;
        this.loadBooks();
      }
    });

    this.filterSearchService.filterBooks.subscribe((books) => {
      this.searchQuery = books.length > 0 ? books : [];
    });
  }

  loadBooks() {
    this.bookService.searchBooks2(this.currentSearchTerm, this.currentPage).subscribe((response: any) => {
      this.searchQuery = response.docs;
      this.totalPages = Math.ceil(response.numFound / 100);
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }

}
