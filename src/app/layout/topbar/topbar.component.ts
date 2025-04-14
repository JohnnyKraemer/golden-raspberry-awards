import { Component, EventEmitter, inject, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  private themeService = inject(ThemeService);

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  get isDark(): boolean {
    return this.themeService.darkModeActive;
  }
}
