import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { GetMoviesParams, GetMoviesResponse } from '../interfaces/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlApi;

  getMovies(params: GetMoviesParams): Observable<GetMoviesResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size);

    if (params.winner !== undefined) {
      httpParams = httpParams.set('winner', params.winner);
    }

    if (params.year !== undefined) {
      httpParams = httpParams.set('year', params.year);
    }

    return this.http.get<GetMoviesResponse>(this.baseUrl, { params: httpParams });
  }
}
