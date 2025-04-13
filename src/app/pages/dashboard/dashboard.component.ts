import { Component } from '@angular/core';
import { ListYearsMultipleWinnersComponent } from './list-years-multiple-winners/list-years-multiple-winners.component';
import { ListTopStudiosWinnersComponent } from "./list-top-studios-winners/list-top-studios-winners.component";

@Component({
  selector: 'app-dashboard',
  imports: [ListYearsMultipleWinnersComponent, ListTopStudiosWinnersComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
