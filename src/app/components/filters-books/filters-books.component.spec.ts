import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersBooksComponent } from './filters-books.component';

describe('FiltersBooksComponent', () => {
  let component: FiltersBooksComponent;
  let fixture: ComponentFixture<FiltersBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
