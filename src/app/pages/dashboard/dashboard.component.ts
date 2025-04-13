import { Component } from '@angular/core';
import { ListYearsMultipleWinnersComponent } from './list-years-multiple-winners/list-years-multiple-winners.component';
import { ListTopStudiosWinnersComponent } from './list-top-studios-winners/list-top-studios-winners.component';
import { ListProducersIntervalWinsComponent } from './list-producers-interval-wins/list-producers-interval-wins.component';
import { ListMovieWinnersByYearComponent } from './list-movie-winners-by-year/list-movie-winners-by-year.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ListYearsMultipleWinnersComponent,
    ListTopStudiosWinnersComponent,
    ListProducersIntervalWinsComponent,
    ListMovieWinnersByYearComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
