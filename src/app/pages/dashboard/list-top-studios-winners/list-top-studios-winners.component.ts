import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { Studio } from '../../../interfaces/movie';

@Component({
  selector: 'app-list-top-studios-winners',
  imports: [CommonModule],
  templateUrl: './list-top-studios-winners.component.html',
})
export class ListTopStudiosWinnersComponent implements OnInit {
  private movieService = inject(MovieService);

  studios: Studio[] = [];

  ngOnInit(): void {
    this.movieService.getStudiosMultipleWinners().subscribe((res) => {
      this.studios = res.studios.slice(0, 3);
    });
  }
}
