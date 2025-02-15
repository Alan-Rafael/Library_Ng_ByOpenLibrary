import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Book } from '../../modelos/Book';
import { BooksService } from '../../services/book-service/books.service';

@Component({
  selector: 'app-books-details',
  imports: [
    NgIf,
  ],
  templateUrl: './books-details.component.html',
  styleUrl: './books-details.component.scss'
})
export class BooksDetailsComponent implements OnInit {
  bookId!: string;
  bookDetail: any;
  books: Book[] = [];
  selectedBook: Book | null = null; 
  coverId: string | null = null;

  constructor(private route: ActivatedRoute, private bookService: BooksService) {
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!; // Captura o ID da URL

    this.bookService.getBookDetails(this.bookId).subscribe({
      next: (details) => {
        this.selectedBook = details;
        console.log('Livro Detalhado:', details);
        if (this.selectedBook?.covers && this.selectedBook.covers.length > 0) {
          this.coverId = this.selectedBook.covers[0]; 
        }
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
  }

  getAuthors(): string {
    return this.selectedBook?.authors?.map((author: { name: string }) => author.name).join(', ') || 'Autor desconhecido';
  }
  

  getSinopse(): string {
    if (this.selectedBook?.description) {
      if (typeof this.selectedBook.description === 'object' && this.selectedBook.description.value) {
        return this.selectedBook.description.value;
      }
      return this.selectedBook.description;
    }
    return 'Sinopse não disponível';
  }

  getGeneres(): string {
    return this.selectedBook?.subjects?.slice(0,7).join(', ') || 'Gêneros desconhecidos';
  }

  getPublishDate(): string {
    return this.selectedBook?.first_publish_date || 'Data de publicação não disponível';
  }

  getSubtitle(): string {
    return this.selectedBook?.subtitle || 'Subtítulo não disponível';
  }

}
