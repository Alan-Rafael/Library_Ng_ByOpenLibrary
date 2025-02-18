import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  constructor(private http: HttpClient,) {}

  searchBooks(query: string): Observable<any[]>{
    return this.http.get<any[]>(`https://openlibrary.org/search.json?title=${query}`)
  }

  searchBooks2(query: string, page: number): Observable<any> {
    return this.http.get<any>(`https://openlibrary.org/search.json`, {
      params: { title: query, page: page.toString(), limit: '18' }
    });
  }

  searchBooksByGenre(genres: string[]): Observable<any> {
    const subjectParam = genres.join(',');
    return this.http.get<any>(`https://openlibrary.org/search.json`, {
      params: { subject: subjectParam, limit: '300', page: '1' }
    });
  }
  getYearIfNotDateHere(bookid: string){
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${bookid}`)
  }

  getBookDetails(bookId: string) {
    return this.http.get<any>(`https://openlibrary.org/works/${bookId}.json`);
  }
  getAuthorDetails(authorKey: string): Observable<any> {
    return this.http.get(`https://openlibrary.org${authorKey}.json`);
  }
  getEditionBook(editionKey: String){
    return this.http.get(`https://openlibrary.org/books/${editionKey}.json`)
  }



  initialBoooksFiction(page: number =1, limit: number =10): Observable<any[]>{
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=adventure+fiction`)
  }
  initialBoooksClassic(page: number =1, limit: number =10): Observable<any[]>{ 
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=classic&page=${page}&limit=${limit}`)
  }
  initialBoooksHqs(page: number =1, limit: number =10): Observable<any[]>{
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=comic&page=${page}&limit=${limit}`)
  }
  initialBoooksJuvenile(page: number =1, limit: number =10): Observable<any[]>{
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=juvenile&page=${page}&limit=${limit}`)
  }
  initialBoooksRomance(page: number =1, limit: number =10): Observable<any[]>{
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=romance&page=${page}&limit=${limit}`)
  }
  initialBoooksSuspense(page: number =1, limit: number =10): Observable<any[]>{
    return this.http.get<any[]>(`https://openlibrary.org/search.json?q=suspense&page=1&limit=10`)
  }
}
