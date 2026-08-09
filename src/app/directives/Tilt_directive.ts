import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Applies a mouse-driven 3D tilt + glare effect to the host element.
 * Usage: <div appTilt class="tilt-card"> ... </div>
 *
 * Requires the host to also have the `.tilt-card` styles (see projects.css)
 * for the glare overlay (`::after` using the --mx/--my custom properties)
 * and the `position: relative; overflow: hidden;` needed to contain it.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  /** Maximum tilt angle in degrees. */
  @Input() tiltMax = 8;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly reducedMotion =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.reducedMotion) {
      return;
    }
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * this.tiltMax * 2;
    const rotateX = (0.5 - y) * this.tiltMax * 2;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
    this.renderer.setStyle(this.el.nativeElement, '--mx', `${x * 100}%`);
    this.renderer.setStyle(this.el.nativeElement, '--my', `${y * 100}%`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'perspective(900px) rotateX(0deg) rotateY(0deg)'
    );
  }
}