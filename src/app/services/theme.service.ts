import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDark = false;

  constructor() {
    const dark = localStorage.getItem('darkMode');
    if (dark === 'true') {
      this.enableDark();
    }
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    localStorage.setItem('darkMode', this.isDark.toString());
    this.updateHtmlClass();
  }

  private enableDark() {
    this.isDark = true;
    this.updateHtmlClass();
  }

  private updateHtmlClass() {
    const html = document.documentElement;
    if (this.isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  get darkModeActive(): boolean {
    return this.isDark;
  }
}
