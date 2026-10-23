import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../Service/theme_services';

@Component({
  selector: 'app-header',
  imports: [ CommonModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;

  private readonly themeService = inject(ThemeService);
  private readonly host = inject(ElementRef<HTMLElement>);

  isMenuOpen = false;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.isMenuOpen) {
      return;
    }

    this.closeMenu();
    this.menuButton?.nativeElement.focus();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !this.host.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}