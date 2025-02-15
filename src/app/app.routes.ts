import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BooksWhenSearchComponent } from './components/books-when-search/books-when-search.component';

export const routes: Routes = [
    {path: '', component: BooksComponent},
    {path: 'viewBook/:id', component: BooksDetailsComponent},
    {path: 'search/:search', component: BooksWhenSearchComponent},

];