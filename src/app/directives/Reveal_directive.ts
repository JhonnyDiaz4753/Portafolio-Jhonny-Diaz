import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Fades + slides an element in the first time it scrolls into view.
 * Usage: <div appReveal> ... </div>
 *
 * Adds the base `.reveal` class (styled globally in styles.css) and
 * flips to `.reveal.in-view` once the element crosses the viewport
 * threshold. SSR-safe and respects prefers-reduced-motion.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: {
    class: 'reveal',
  },
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderer.addClass(this.el.nativeElement, 'in-view');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'in-view');
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}