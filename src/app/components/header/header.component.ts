import { Book } from './../../modelos/Book';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BooksService } from '../../services/book-service/books.service';
import { FormsModule } from '@angular/forms';
import { BookSearchService } from '../../services/search-service/book-search.service';
import { FilterServiceService } from '../../services/filters-service/filter-service.service';
import { NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatRadioModule,
    MatMenuModule, MatButtonModule, NgFor,
    FormsModule, RouterModule, NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  searchQuery = '';
  books: Book[] = [];
  selectedGenre: string | null = null;

  constructor
    (private router: Router,
      private searchBookeService: BookSearchService,
      private bookService: BooksService,
      private filterBookService: FilterServiceService,
    ) { }

  navigateHome(): void {
    this.router.navigate(['']);
  }

  searchBooks(query: string) {
    if (query.trim()) {
      this.searchBookeService.setSearchBooks(query);
      this.router.navigate(['search', query]);
    }
  }

  options = [
    { value: 'action', label: 'Action', selected: false },
    { value: 'Adventure', label: 'Adventure', selected: false },
    { value: 'crimes', label: 'Crimes', selected: false },
    { value: 'classic', label: 'Classic', selected: false },
    { value: 'Fantasy', label: 'Fantasy', selected: false },
    { value: 'Family', label: 'Family', selected: false },
    { value: 'Fiction', label: 'Fiction', selected: false },
    { value: 'Horror', label: 'Horror', selected: false },
    { value: 'Superheroes', label: 'Superheroes', selected: false },
    { value: 'Juvenile literature', label: 'Juvenil', selected: false },
    { value: 'Mystery', label: 'Mystery', selected: false },
    { value: 'Religion', label: 'Religion', selected: false },
    { value: 'Romance, love', label: 'Romance', selected: false },
    { value: 'Schools', label: 'Schools', selected: false },
    { value: 'Suspense', label: 'Suspense', selected: false },];

  relatedGenres: { [key: string]: string[] } = {
    'Romance': ['Romance', 'Love'],
    'Juvenile literature': ['Superheroes', 'Comic and Graphic Books',],
    'Adventure': ['Adventure', 'Juvenile literature',],
    'Fantasy': ['Fantasy', 'Adventure'],
    'Juvenile fiction': ['Juvenile fiction'],
    'Mystery': ['Mystery', 'Crime & Mystery'],
    'Fiction': ['Fiction', 'Juvenile fiction',],
    'Classic': ['Classic', 'Novel'],
    'Horror': ['Horror', 'Terror',],
    'Schools': ['Schools', 'Education',],
    'Family': ['Family', 'Children',],
    'Action': ['Action', 'Adventure',],
    'Suspense': ['Suspense', 'Mystery',],
    'Crimes': ['Crimes', 'Crime & Mystery'],
    'Religion': ['Religion', 'Theology',],
    'Superheroes': ['superheroes',],
  };


  showFilter = false;

  toggleFilter() {
    this.showFilter = !this.showFilter;
    console.log(this.showFilter)
  }

  onSubmitByGenres() {
    console.log('Filtrando por gênero:', this.selectedGenre);
    this.showFilter = false;  // Fecha a div ao submeter o filtro
    const genre = this.selectedGenre;
    if (!genre) {
      return;
    }
    let expandedGenres = new Set<string>();
    if (this.relatedGenres[genre]) {
      this.relatedGenres[genre].forEach(related => expandedGenres.add(related));
    } else {
      expandedGenres.add(genre);
    }
    const genresArray = Array.from(expandedGenres);
    this.bookService.searchBooksByGenre(genresArray).subscribe({
      next: (data: any) => {
        this.books = (Array.isArray(data.docs) ? data.docs : []).filter((book: Book) => book.cover_i != null);
        this.filterBookService.setFiltersBooks(this.books);
        const genres = genresArray.join(',');

        this.router.navigate(['/search', genres]);
        console.log('estou chamando /search');
      },
    });
  }


}

