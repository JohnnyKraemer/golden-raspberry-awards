import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ListYearsMultipleWinnersComponent } from './list-years-multiple-winners/list-years-multiple-winners.component';
import { ListTopStudiosWinnersComponent } from './list-top-studios-winners/list-top-studios-winners.component';
import { ListProducersIntervalWinsComponent } from './list-producers-interval-wins/list-producers-interval-wins.component';
import { ListMovieWinnersByYearComponent } from './list-movie-winners-by-year/list-movie-winners-by-year.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { provideNgxMask } from 'ngx-mask';
import { Pagination } from '../../interfaces/pagination';
import { Movie } from '../../interfaces/movie';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getYearsMultipleWinners',
      'getStudiosMultipleWinners',
      'getProducersIntervalWins',
      'getMovies',
    ]);

    movieServiceSpy.getYearsMultipleWinners.and.returnValue(of({ years: [] }));
    movieServiceSpy.getStudiosMultipleWinners.and.returnValue(
      of({ studios: [] })
    );
    movieServiceSpy.getProducersIntervalWins.and.returnValue(
      of({ min: [], max: [] })
    );

    const mockPagination: Pagination<Movie> = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      last: true,
      size: 10,
      number: 0,
      first: true,
      empty: true,
    };

    movieServiceSpy.getMovies.and.returnValue(of(mockPagination));

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        ListYearsMultipleWinnersComponent,
        ListTopStudiosWinnersComponent,
        ListProducersIntervalWinsComponent,
        ListMovieWinnersByYearComponent,
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        provideNgxMask(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all child components', () => {
    const compiled = fixture.nativeElement;

    expect(
      compiled.querySelector('app-list-years-multiple-winners')
    ).not.toBeNull();
    expect(
      compiled.querySelector('app-list-top-studios-winners')
    ).not.toBeNull();
    expect(
      compiled.querySelector('app-list-producers-interval-wins')
    ).not.toBeNull();
    expect(
      compiled.querySelector('app-list-movie-winners-by-year')
    ).not.toBeNull();
  });

  it('should have correct grid layout', () => {
    const compiled = fixture.nativeElement;
    const gridElement = compiled.querySelector('.grid');

    expect(gridElement).not.toBeNull();
    expect(gridElement.classList).toContain('grid-cols-1');
    expect(gridElement.classList).toContain('lg:grid-cols-2');
    expect(gridElement.classList).toContain('gap-4');
  });

  it('should display all components in correct order', () => {
    const compiled = fixture.nativeElement;
    const gridChildren = compiled.querySelector('.grid').children;

    expect(gridChildren.length).toBe(4);
    expect(gridChildren[0].tagName).toContain(
      'APP-LIST-YEARS-MULTIPLE-WINNERS'
    );
    expect(gridChildren[1].tagName).toContain('APP-LIST-TOP-STUDIOS-WINNERS');
    expect(gridChildren[2].tagName).toContain(
      'APP-LIST-PRODUCERS-INTERVAL-WINS'
    );
    expect(gridChildren[3].tagName).toContain('APP-LIST-MOVIE-WINNERS-BY-YEAR');
  });

  it('should maintain responsive layout classes', () => {
    const compiled = fixture.nativeElement;
    const gridElement = compiled.querySelector('.grid');

    expect(gridElement.classList).toContain('grid-cols-1');
    expect(gridElement.classList).toContain('lg:grid-cols-2');
  });

  it('should initialize all child components with empty data', () => {
    // Verificar se os métodos do serviço foram chamados
    expect(movieServiceSpy.getYearsMultipleWinners).toHaveBeenCalled();
    expect(movieServiceSpy.getStudiosMultipleWinners).toHaveBeenCalled();
    expect(movieServiceSpy.getProducersIntervalWins).toHaveBeenCalled();
  });
});
