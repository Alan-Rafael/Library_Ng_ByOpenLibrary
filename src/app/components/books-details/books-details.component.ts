import { catchError, map, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../../modelos/Book';
import { BooksService } from '../../services/book-service/books.service';
import { Author } from '../../modelos/Autho';

@Component({
  selector: 'app-books-details',
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './books-details.component.html',
  styleUrl: './books-details.component.scss'
})
export class BooksDetailsComponent implements OnInit {

  author?: Author[];
  bookId!: string;
  bookDetail: any;
  books: Book[] = [];
  selectedBook: Book | null = null; 
  coverId: string | null = null;
  publishYear: string = 'Ano não disponível';


  constructor(private route: ActivatedRoute, private bookService: BooksService) {
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!; 

    this.bookService.getBookDetails(this.bookId).subscribe({
      next: (details) => {
        this.selectedBook = details;
        console.log('Livro Detalhado:', details);
        
        if (this.selectedBook?.covers && this.selectedBook.covers.length > 0) {
          this.coverId = this.selectedBook.covers[0]; 
        }
        this.publishYear = this.selectedBook?.first_publish_year?.toString()
          || 'Ano não disponível';

        if (this.selectedBook?.authors) {
          this.selectedBook.authors = this.selectedBook.authors.map((authorData: any) => {
            if (authorData.author && authorData.author.key) {
              this.bookService.getAuthorDetails(authorData.author.key).subscribe(
                (authorDetails) => {
                  authorData.name = authorDetails.name;
                },
                (error) => {
                  console.error('Erro ao obter detalhes do autor', error);
                }
              );
            }
            return authorData;
          });
        }

      },
      error: (err) => {
        console.error('Erro ao buscar detalhes do livro', err);
      },
    });

    this.bookService.getYearIfNotDateHere(this.bookId).subscribe({
      next: (response) => {
        const year = response.docs[0]?.first_publish_year;
        if (year) {
          this.publishYear = year.toString();
        }
      },
      error: (err) => {
        console.error('Erro ao buscar ano de publicação', err);
      },
    });
  }


  getAuthors(): { name: string; url?: string }[] {
    return this.selectedBook?.authors?.map((authorObj: any) => ({
      name: authorObj.name || "Autor desconhecido", // Verifica se já tem o nome preenchido
      url: authorObj.author?.key ? `https://openlibrary.org${authorObj.author.key}` : undefined,
    })) || [];
  }
  
  getSinopse(): string {
    if (this.selectedBook?.description) {
      if (typeof this.selectedBook.description === 'object' && this.selectedBook.description.value) {
        return this.selectedBook.description.value;
      }
      return this.selectedBook.description;
    }
    return "This work doesn't have a description yet";
  }

  getGeneres(): string[] {
    return this.selectedBook?.subjects?.slice(0,7) || []; 'Gêneros desconhecidos';
  }

  getBookOpenLibraryUrl(): string {
    return `https://openlibrary.org/works/${this.bookId}`;
  }

  getPublishDate(): string {
    return this.publishYear;
  }


  getSubtitle(): string {
    return this.selectedBook?.subtitle || 'Subtítulo não disponível';
  }

}
