import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Interval } from '../../../interfaces/movie';

@Component({
  selector: 'app-list-producers-interval-wins',
  imports: [CommonModule],
  templateUrl: './list-producers-interval-wins.component.html'
})
export class ListProducersIntervalWinsComponent implements OnInit {
  private movieService = inject(MovieService);

  interval: Interval | null = null;

  ngOnInit(): void {
    this.movieService.getProducersIntervalWins().subscribe((res) => {
      this.interval = res;
    });
  }
}
