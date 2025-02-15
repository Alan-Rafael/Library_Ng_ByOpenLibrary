import { Component } from '@angular/core';
import { FilterServiceService } from '../../services/filters-service/filter-service.service';
import { BooksService } from '../../services/book-service/books.service';
import { Book } from '../../modelos/Book';
import { FormsModule } from '@angular/forms';
import { NgForOf, CommonModule } from '@angular/common';
import { Router,  RouterModule } from '@angular/router';

@Component({
  selector: 'app-filters-books',
  imports: [FormsModule, NgForOf, CommonModule, RouterModule],
  templateUrl: './filters-books.component.html',
  styleUrl: './filters-books.component.scss'
})
export class FiltersBooksComponent {
  books: Book[] = [];
  options = [
    { value: 'action', label: 'Action', selected: false },
    { value: 'Adventure', label: 'Adventure', selected: false },
    { value: 'crimes', label: 'Crimes', selected: false },
    { value: 'classic', label: 'Classic', selected: false },
    { value: 'Fantasy', label: 'Fantasy', selected: false },
    { value: 'Family', label: 'Family', selected: false },
    { value: 'Fiction', label: 'Fiction', selected: false },
    { value: 'Horror', label: 'Horror', selected: false },
    { value: 'Comic and Graphic Books', label: 'HQs', selected: false },
    { value: 'Juvenile literature', label: 'Juvenil', selected: false },
    { value: 'Mystery', label: 'Mystery', selected: false },
    { value: 'Religion', label: 'Religion', selected: false },
    { value: 'Romance, love', label: 'Romance', selected: false },
    { value: 'Schools', label: 'Schools', selected: false },
    { value: 'Suspense', label: 'Suspense', selected: false },];

  relatedGenres: { [key: string]: string[] } = {
    'Romance': ['Romance', 'Love'],
    'Juvenile literature': ['Comics & graphic novels, superheroes','Juvenile literature','Comic and Graphic Books', "Children's stories", 'Adventure', 'Children', 'Fantasy', 'Juvenile fiction'],
    'Adventure': ['Adventure', 'Action', 'Fantasy', 'Juvenile literature', 'Children'],
    'Fantasy': ['Fantasy', 'Juvenile fiction', 'Children', 'Adventure'],
    'Mystery': ['Mystery', 'Suspense', 'Crime & Mystery','Crimes', 'Detective and mystery stories'],
    'Fiction': ['Fiction', 'Literature', 'Novel', 'Juvenile fiction', 'Love'],
    'Classic': ['Classic', 'Literature', 'Novel'],
    'Horror': ['Horror', 'Suspense', 'Terror', 'Thriller', 'horror fiction'],
    'Schools': ['Schools', 'Education', 'Children', 'Juvenile literature'],
    'Family': ['Family', 'Children', 'Juvenile literature'],
    'Action': ['Action', 'Adventure', 'Suspense'],
    'Suspense': ['Suspense', 'Mystery', 'Thriller', 'Action'],
    'Crimes': ['Crimes', 'Mystery', 'Detective and mystery stories', 'Crime & Mystery'],
    'Religion': ['Religion', 'Theology', 'Christianity'],
    'Comic and Graphic Books': ['Comics & graphic novels, superheroes','Comic and Graphic Books',],
  };

  constructor(
    private bookService: BooksService,
    private filterBookService: FilterServiceService,
    private router: Router) { }


  onSubmitByGenres() {
    let selectedValues = this.options.filter(option => option.selected)
      .map(option => option.value);

    let expandedGenres = new Set<string>();
    selectedValues.forEach(genre => {
      if (this.relatedGenres[genre]) {
        this.relatedGenres[genre].forEach(related => expandedGenres.add(related));
      } else {
        expandedGenres.add(genre);
      }
    });
    const genresArray = Array.from(expandedGenres);

    this.bookService.searchBooksByGenre(genresArray).subscribe({
      next: (data: any) => {
        this.books = (Array.isArray(data.docs) ? data.docs : []).filter((book: Book) => book.cover_i != null);
        this.filterBookService.setFiltersBooks(this.books);
        const genres = genresArray.join(',')  

        this.router.navigate(['/search', genres]);
        console.log('estou chamando /search');

      },
    });
  }
}
