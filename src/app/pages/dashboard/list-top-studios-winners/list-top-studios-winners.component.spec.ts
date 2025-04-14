import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTopStudiosWinnersComponent } from './list-top-studios-winners.component';
import { MovieService } from '../../../services/movie.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('ListTopStudiosWinnersComponent', () => {
  let component: ListTopStudiosWinnersComponent;
  let fixture: ComponentFixture<ListTopStudiosWinnersComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockStudioData = {
    studios: [
      { name: 'Columbia Pictures', winCount: 9 },
      { name: 'Paramount Pictures', winCount: 8 },
      { name: 'Warner Bros', winCount: 7 },
      { name: '20th Century Fox', winCount: 6 },
      { name: 'Universal Studios', winCount: 5 },
    ],
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getStudiosMultipleWinners',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ListTopStudiosWinnersComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTopStudiosWinnersComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    movieService.getStudiosMultipleWinners.and.returnValue(of(mockStudioData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty studios array', () => {
    expect(component.studios).toEqual([]);
  });

  it('should call getStudiosMultipleWinners on init', () => {
    component.ngOnInit();
    expect(movieService.getStudiosMultipleWinners).toHaveBeenCalled();
  });

  it('should populate studios with top 3 studios from service response', () => {
    component.ngOnInit();
    expect(component.studios.length).toBe(3);
    expect(component.studios).toEqual(mockStudioData.studios.slice(0, 3));
  });

  it('should order studios by winCount descending', () => {
    component.ngOnInit();

    for (let i = 0; i < component.studios.length - 1; i++) {
      expect(component.studios[i].winCount).toBeGreaterThanOrEqual(
        component.studios[i + 1].winCount
      );
    }
  });

  it('should display only top 3 studios even if service returns more', () => {
    expect(mockStudioData.studios.length).toBeGreaterThan(3);

    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const tableRows = compiled.querySelectorAll('table tbody tr');
    expect(tableRows.length).toBe(3);
  });
});
