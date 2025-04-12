import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComponent } from './pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
