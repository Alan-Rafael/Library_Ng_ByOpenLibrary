import { Book } from './../../modelos/Book';
import { Component, OnInit,ElementRef, ViewChildren, QueryList  } from '@angular/core';
import { BooksService } from '../../services/book-service/books.service';
import { NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule,} from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  imports: [
    MatPaginatorModule,
    FormsModule,
    NgForOf,
    CommonModule,
    RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})

export class BooksComponent implements OnInit{
    @ViewChildren('bookRowRef') bookRows!: QueryList<ElementRef>;
    books: Book[] = [];
    searchQuery: Book[] = [];
    selectedBook: Book | null = null; 

    constructor(private route: Router, 
      private bookService: BooksService,){}

    ngOnInit(){  
        if (this.searchQuery.length === 0) {
          this.loadInitialBooks();
        }
    }

    loadInitialBooks() {
      this.loadBooksByGenre('romance');
      this.loadBooksByGenre('fiction');
      this.loadBooksByGenre('classic');
      this.loadBooksByGenre('comic');
      this.loadBooksByGenre('juvenile');
      this.loadBooksByGenre('suspense');
      console.log("Pelo menos esta chamando ");
    }

    booksByGenre: { [key: string]: { books: Book[], page: number } } = {
      romance: { books: [], page: 1 },
      fiction: { books: [], page: 1 },
      classic: { books: [], page: 1 },
      comic: { books: [], page: 1 },
      juvenile: { books: [], page: 1 },
      suspense: { books: [], page: 1 },
    };

    loadBooksByGenre(genre: string) {
      const page = this.booksByGenre[genre].page;
      const limit = 10; 
      let request$: Observable<any>;
      switch (genre) {
        case 'romance':
          request$ = this.bookService.initialBoooksRomance(page, limit);
          break;
        case 'fiction':
          request$ = this.bookService.initialBoooksFiction(page, limit);
          break;
        case 'classic':
          request$ = this.bookService.initialBoooksClassic(page, limit);
          break;
        case 'comic':
          request$ = this.bookService.initialBoooksHqs(page, limit);
          break;
        case 'juvenile':
          request$ = this.bookService.initialBoooksJuvenile(page, limit);
          break;
        case 'suspense':
          request$ = this.bookService.initialBoooksSuspense(page, limit);
          break;
        default:
          return;
      }
    
      request$.subscribe({
        next: (data: any) => {
          const newBooks = (Array.isArray(data.docs) ? data.docs : []).filter((book: Book) => book.cover_i);
          this.booksByGenre[genre].books = [...this.booksByGenre[genre].books, ...newBooks];
          this.booksByGenre[genre].page += 1;
        }
      });
    }
    
    viewBookDetails(): void {
      this.route.navigate(['viewBookDetails'])
    }
    
    scrollLeft(index: number) {
      const row = this.bookRows.toArray()[index]?.nativeElement;
      if (row) {
          row.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }

  scrollBooks(bookRow: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 700; 
    if (direction === 'right') {
      bookRow.scrollLeft += scrollAmount;
    } else {
      bookRow.scrollLeft -= scrollAmount;
    }
  }

}
