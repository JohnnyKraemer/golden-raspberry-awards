import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovieWinnersByYearComponent } from './list-movie-winners-by-year.component';

describe('ListMovieWinnersByYearComponent', () => {
  let component: ListMovieWinnersByYearComponent;
  let fixture: ComponentFixture<ListMovieWinnersByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMovieWinnersByYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMovieWinnersByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
