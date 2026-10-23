import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import {
  IMAGE_LOADER,
  NgOptimizedImage,
  isPlatformBrowser,
  type ImageLoaderConfig,
} from '@angular/common';

const HERO_IMAGE_WIDTHS = [540, 720, 1080] as const;

function heroImageLoader(config: ImageLoaderConfig): string {
  if (!config.width) {
    return config.src;
  }

  const targetWidth = config.width;
  const width =
    HERO_IMAGE_WIDTHS.find((candidate) => targetWidth <= candidate) ??
    HERO_IMAGE_WIDTHS[HERO_IMAGE_WIDTHS.length - 1];

  return `/images/grados_cara-${width}.webp`;
}

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  providers: [{ provide: IMAGE_LOADER, useValue: heroImageLoader }],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly reducedMotion =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  protected readonly rotateX = signal(0);
  protected readonly rotateY = signal(0);

  private frameId = 0;
  private pendingEvent: MouseEvent | null = null;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.reducedMotion) {
      return;
    }

    this.pendingEvent = event;
    if (this.frameId) {
      return;
    }

    this.frameId = requestAnimationFrame(() => {
      this.frameId = 0;
      const pending = this.pendingEvent;
      this.pendingEvent = null;

      if (!pending) {
        return;
      }

      const rect = this.el.nativeElement.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const px = (pending.clientX - rect.left) / rect.width - 0.5;
      const py = (pending.clientY - rect.top) / rect.height - 0.5;
      this.rotateX.set(-py * 12);
      this.rotateY.set(px * 18);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }

    this.pendingEvent = null;
    this.rotateX.set(0);
    this.rotateY.set(0);
  }

  ngOnDestroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }
}
