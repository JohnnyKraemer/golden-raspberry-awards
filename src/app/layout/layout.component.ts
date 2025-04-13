import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent, LoaderComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  showSidebar = window.innerWidth >= 640;

  ngOnInit(): void {
    this.checkWindowWidth();
    window.addEventListener('resize', this.checkWindowWidth);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkWindowWidth);
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  checkWindowWidth = () => {
    const shouldBeVisible = window.innerWidth >= 640;
    if (this.showSidebar !== shouldBeVisible) {
      this.showSidebar = shouldBeVisible;
    }
  };
}
