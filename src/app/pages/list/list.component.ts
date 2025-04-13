import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { GetMoviesParams, Movie } from '../../interfaces/movie';
import { debounceTime } from 'rxjs/operators';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ReactiveFormsModule, PaginatorComponent],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);

  movies: Movie[] = [];

  paramsForm: FormGroup = this.fb.group({
    page: 0,
    size: 10,
    year: null,
    winner: null,
  });

  pagination: Pagination<Movie> | null = null;

  ngOnInit(): void {
    this.paramsForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.fetchMovies();
    });

    this.fetchMovies();
  }

  fetchMovies(): void {
    const rawParams = this.paramsForm.value;

    const params: GetMoviesParams = {
      page: rawParams.page,
      size: rawParams.size,
      year: rawParams.year ?? undefined,
      winner: rawParams.winner ?? undefined,
    };

    this.movieService.getMovies(params).subscribe((res) => {
      this.movies = res.content;
      this.pagination = res;
    });
  }
}
