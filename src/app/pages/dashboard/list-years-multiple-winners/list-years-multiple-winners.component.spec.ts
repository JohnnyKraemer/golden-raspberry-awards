import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListYearsMultipleWinnersComponent } from './list-years-multiple-winners.component';
import { MovieService } from '../../../services/movie.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('ListYearsMultipleWinnersComponent', () => {
  let component: ListYearsMultipleWinnersComponent;
  let fixture: ComponentFixture<ListYearsMultipleWinnersComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockYearsData = {
    years: [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 2 },
      { year: 2015, winnerCount: 2 }
    ]
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getYearsMultipleWinners']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ListYearsMultipleWinnersComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListYearsMultipleWinnersComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    movieService.getYearsMultipleWinners.and.returnValue(of(mockYearsData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty years array', () => {
    expect(component.years).toEqual([]);
  });

  it('should call getYearsMultipleWinners on init', () => {
    component.ngOnInit();
    expect(movieService.getYearsMultipleWinners).toHaveBeenCalled();
  });

  it('should populate years array with correct data from service', () => {
    component.ngOnInit();
    expect(component.years).toEqual(mockYearsData.years);
  });

  it('should have years with winnerCount greater than 1', () => {
    component.ngOnInit();
    expect(component.years.length).toBeGreaterThan(0);
    component.years.forEach(year => {
      expect(year.winnerCount).toBeGreaterThan(1);
    });
  });

  it('should display the correct number of years', () => {
    component.ngOnInit();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const yearElements = compiled.querySelectorAll('tr');
    // +1 para o cabeçalho da tabela
    expect(yearElements.length).toBe(mockYearsData.years.length + 1);
  });

  it('should render year and winnerCount in the table', () => {
    component.ngOnInit();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const firstYearRow = compiled.querySelector('tbody tr');
    
    expect(firstYearRow).toBeTruthy();
    expect(firstYearRow.cells[0].textContent).toContain(mockYearsData.years[0].year.toString());
    expect(firstYearRow.cells[1].textContent).toContain(mockYearsData.years[0].winnerCount.toString());
  });
});