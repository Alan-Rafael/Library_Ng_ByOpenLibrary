import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksWhenSearchComponent } from './books-when-search.component';

describe('BooksWhenSearchComponent', () => {
  let component: BooksWhenSearchComponent;
  let fixture: ComponentFixture<BooksWhenSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksWhenSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksWhenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
