import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListMovieWinnersByYearComponent } from './list-movie-winners-by-year.component';
import { MovieService } from '../../../services/movie.service';
import { FormBuilder } from '@angular/forms';
import { Movie } from '../../../interfaces/movie';
import { Pagination } from '../../../interfaces/pagination';
import { of } from 'rxjs';

describe('ListMovieWinnersByYearComponent', () => {
  let component: ListMovieWinnersByYearComponent;
  let fixture: ComponentFixture<ListMovieWinnersByYearComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let fb: FormBuilder;

  const mockMovies: Movie[] = [
    { id: 1, year: 1980, title: "Can't Stop the Music", winner: true },
    { id: 36, year: 1981, title: 'Mommie Dearest', winner: false }
  ];

  const mockPagination: Pagination<Movie> = {
    content: mockMovies,
    totalPages: 2,
    totalElements: 2,
    size: 10,
    number: 0,
    first: true,
    last: false,
    empty: false
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [ListMovieWinnersByYearComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListMovieWinnersByYearComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fb = TestBed.inject(FormBuilder);

    movieService.getMovies.and.returnValue(of(mockPagination));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.movies).toEqual([]);
    expect(component.pagination).toBeNull();
    expect(component.activeFilters).toEqual(['year']);
    expect(component.paramsForm.value).toEqual({
      page: 0,
      size: 10,
      year: null,
      winner: true
    });
  });

  it('should filter movies by year', fakeAsync(() => {
    component.ngOnInit();
    
    component.paramsForm.patchValue({ year: 1980 });
    tick(300); // Espera do debounceTime
    
    expect(movieService.getMovies).toHaveBeenCalledWith({
      page: 0,
      size: 10,
      year: 1980,
      winner: true
    });

    // Verificar se o primeiro item corresponde ao filtro
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.movies[0].year).toBe(1980);
  }));

  it('should filter movies by winner', fakeAsync(() => {
    component.ngOnInit();
    
    component.paramsForm.patchValue({ winner: true });
    tick(300); // Espera do debounceTime
    
    expect(movieService.getMovies).toHaveBeenCalledWith({
      page: 0,
      size: 10,
      year: undefined,
      winner: true
    });

     // Verificar se o primeiro item corresponde ao filtro
     expect(component.movies.length).toBeGreaterThan(0);
     expect(component.movies[0].winner).toBe(true);
  }));

  it('should handle pagination', fakeAsync(() => {
    component.ngOnInit();
    
    component.paramsForm.patchValue({ page: 1 });
    tick(300); // Espera do debounceTime
    
    expect(movieService.getMovies).toHaveBeenCalledWith({
      page: 1,
      size: 10,
      year: undefined,
      winner: true
    });
  }));

  it('should debounce form changes', fakeAsync(() => {
    const fetchMoviesSpy = spyOn(component, 'fetchMovies').and.callThrough();
    component.ngOnInit();
    
    // Teste de debounce com várias mudanças rápidas
    component.paramsForm.patchValue({ year: 1980 });
    component.paramsForm.patchValue({ year: 1985 });
    component.paramsForm.patchValue({ year: 1990 });
    
    tick(300);
    expect(fetchMoviesSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not trigger fetch if form is invalid', fakeAsync(() => {
    const fetchMoviesSpy = spyOn(component, 'fetchMovies').and.callThrough();
    component.ngOnInit();
    
    // Fazer o formulário inválido
    component.paramsForm.get('page')?.setValue(-1);
    component.paramsForm.patchValue({ year: 1980 });
    tick(300);
    
    expect(fetchMoviesSpy).toHaveBeenCalledTimes(0);
  }));

  it('should only trigger fetch when values actually change', fakeAsync(() => {
    const fetchMoviesSpy = spyOn(component, 'fetchMovies').and.callThrough();
    component.ngOnInit();
    
    // Fazer várias mudanças com o mesmo valor
    component.paramsForm.patchValue({ year: 1980 });
    component.paramsForm.patchValue({ year: 1980 });
    component.paramsForm.patchValue({ year: 1980 });
    tick(300);
    
    expect(fetchMoviesSpy).toHaveBeenCalledTimes(1);
  }));
});
