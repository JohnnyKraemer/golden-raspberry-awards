import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { GetMoviesParams, Movie } from '../../../interfaces/movie';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PaginatorComponent } from '../../../components/paginator/paginator.component';
import { Pagination } from '../../../interfaces/pagination';
import {
  FilterType,
  TableFilterComponent,
} from '../../../components/table-filter/table-filter.component';
import { CustomValidators } from '../../../validators/custom.validators';

@Component({
  selector: 'app-list-movie-winners-by-year',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorComponent,
    TableFilterComponent,
  ],
  templateUrl: './list-movie-winners-by-year.component.html',
})
export class ListMovieWinnersByYearComponent implements OnInit {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);

  movies: Movie[] = [];
  activeFilters: FilterType[] = ['year'];
  currentYear = new Date().getFullYear();

  paramsForm: FormGroup = this.fb.group({
    page: [0, [Validators.min(0)]],
    size: [10],
    year: [null, [CustomValidators.yearValidator(this.currentYear)]],
    winner: [true],
  });

  pagination: Pagination<Movie> | null = null;

  ngOnInit(): void {
    this.paramsForm.get('year')?.valueChanges.subscribe(() => {
      if (this.paramsForm.valid) {
        this.paramsForm.patchValue({ page: 0 }, { emitEvent: false });
      }
    });

    this.paramsForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe(() => {
        if (this.paramsForm.valid) {
          this.fetchMovies();
        }
      });
  }

  fetchMovies(): void {
    const rawParams = this.paramsForm.value;

    if (!rawParams.year) {
      this.movies = [];
      this.pagination = null;
      return;
    }

    const params: GetMoviesParams = {
      page: rawParams.page,
      size: rawParams.size,
      year: rawParams.year ?? undefined,
      winner: true,
    };

    this.movieService.getMovies(params).subscribe((res) => {
      this.movies = res.content;
      this.pagination = res;
    });
  }
}
