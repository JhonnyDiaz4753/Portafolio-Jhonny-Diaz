import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../Service/theme_services';

@Component({
  selector: 'app-header',
  imports: [ CommonModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private readonly themeService = inject(ThemeService);
  readonly isDarkMode = computed(() => this.themeService.theme() === 'dark');

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

   downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'CV/cv_Jhonny_DIaz.pdf';
    link.download = 'cv_Jhonny_DIaz.pdf'; 
    link.click();
  }
}