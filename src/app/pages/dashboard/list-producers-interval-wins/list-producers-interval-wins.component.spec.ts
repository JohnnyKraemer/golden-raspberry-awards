import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProducersIntervalWinsComponent } from './list-producers-interval-wins.component';
import { MovieService } from '../../../services/movie.service';
import { of } from 'rxjs';
import { Interval } from '../../../interfaces/movie';
import { CommonModule } from '@angular/common';

describe('ListProducersIntervalWinsComponent', () => {
  let component: ListProducersIntervalWinsComponent;
  let fixture: ComponentFixture<ListProducersIntervalWinsComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockIntervalData: Interval = {
    min: [
      {
        producer: 'Producer A',
        interval: 1,
        previousWin: 2018,
        followingWin: 2019,
      },
      {
        producer: 'Producer B',
        interval: 2,
        previousWin: 2017,
        followingWin: 2019,
      },
    ],
    max: [
      {
        producer: 'Producer X',
        interval: 99,
        previousWin: 1900,
        followingWin: 1999,
      },
      {
        producer: 'Producer Y',
        interval: 50,
        previousWin: 1950,
        followingWin: 2000,
      },
    ],
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getProducersIntervalWins',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ListProducersIntervalWinsComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProducersIntervalWinsComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    movieService.getProducersIntervalWins.and.returnValue(of(mockIntervalData));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null interval', () => {
    expect(component.interval).toBeNull();
  });

  it('should call getProducersIntervalWins on init', () => {
    component.ngOnInit();
    expect(movieService.getProducersIntervalWins).toHaveBeenCalled();
  });

  it('should populate interval with correct data from service', () => {
    component.ngOnInit();
    expect(component.interval).toEqual(mockIntervalData);
  });
});
