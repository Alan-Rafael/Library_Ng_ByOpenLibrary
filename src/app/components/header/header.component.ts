import { Book } from './../../modelos/Book';
import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BooksService } from '../../services/book-service/books.service';
import { FormsModule } from '@angular/forms';
import { BookSearchService } from '../../services/search-service/book-search.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchQuery = '';
  books: Book[] = [];


  constructor(private router: Router,
              private bookServicie: BooksService,
              private searchBookeService: BookSearchService,
              ){}

  navigateHome(): void {
      this.router.navigate(['']);    
  }


  searchBooks(query: string){
    if(query.trim()){
      this.searchBookeService.setSearchBooks(query);
      this.router.navigate(['search', query]);
    }
  }

}

