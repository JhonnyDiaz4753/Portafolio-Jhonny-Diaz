import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ CommonModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isMenuOpen = false;
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

   downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'CV/JhonnyDiazCenteno_CV_DesarolladorWeb.pdf';
    link.download = 'JhonnyDiazCenteno_CV_DesarolladorWeb.pdf'; 
    link.click();
  }
}
