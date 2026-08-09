import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
 
@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
 private readonly platformId = inject(PLATFORM_ID);
  private readonly reducedMotion =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  protected readonly rotateX = signal(0);
protected readonly rotateY = signal(0);
 
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.reducedMotion) {
      return;
    }
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.rotateX.set(-py * 12);
    this.rotateY.set(px * 18);
  }
 
 @HostListener('mouseleave')
onMouseLeave(): void {
  this.rotateX.set(0);
  this.rotateY.set(0);
}
}
