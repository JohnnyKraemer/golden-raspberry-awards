import { Component, inject, OnInit } from '@angular/core';
import { Years } from '../../../interfaces/movie';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-years-multiple-winners',
  imports: [CommonModule],
  templateUrl: './list-years-multiple-winners.component.html'
})
export class ListYearsMultipleWinnersComponent implements OnInit {
  private movieService = inject(MovieService);

  years: Years[] = [];

  ngOnInit(): void {
    this.movieService.getYearsMultipleWinners().subscribe((res) => {
      this.years = res.years;
    });
  }
}
