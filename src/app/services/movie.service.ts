import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { GetMoviesParams, Movie } from '../interfaces/movie';
import { Observable } from 'rxjs';
import { Pagination } from '../interfaces/pagination';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlApi;

  getMovies(params: GetMoviesParams): Observable<Pagination<Movie>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size);

    if (params.winner !== undefined) {
      httpParams = httpParams.set('winner', params.winner);
    }

    if (params.year !== undefined) {
      httpParams = httpParams.set('year', params.year);
    }

    return this.http.get<Pagination<Movie>>(this.baseUrl, { params: httpParams });
  }
}
