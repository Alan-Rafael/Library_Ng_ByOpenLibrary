import { TestBed } from '@angular/core/testing';

import { BookSearchService } from '../search-service/book-search.service';

describe('BookSearchService', () => {
  let service: BookSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
