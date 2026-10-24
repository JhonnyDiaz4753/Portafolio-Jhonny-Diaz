import { Component, computed, input, signal } from '@angular/core';
import { ProjectImage } from '../../../models/Proyect';

@Component({
  selector: 'app-project-carousel',
  host: { '[class.project-carousel-host--featured]': 'featured()' },
  templateUrl: './project-carousel.html',
  styleUrl: './project-carousel.css',
})
export class ProjectCarousel {
  readonly images = input.required<ProjectImage[]>();
  readonly title = input.required<string>();
  readonly media = input<'browser' | 'phone'>('browser');
  readonly browserTitle = input('');
  readonly featured = input(false);

  protected readonly activeIndex = signal(0);
  protected readonly total = computed(() => this.images().length);
  protected readonly hasMultiple = computed(() => this.total() > 1);
  protected readonly aspectRatio = computed(() => {
    const image = this.images()[0];
    return image ? `${image.width} / ${image.height}` : '16 / 9';
  });
  protected readonly slideTransform = computed(
    () => `translateX(-${this.activeIndex() * 100}%)`,
  );
  protected readonly imageSizes = computed(() =>
    this.media() === 'phone'
      ? '(max-width: 900px) 220px, 240px'
      : '(max-width: 720px) calc(100vw - 2rem), (max-width: 900px) 90vw, (max-width: 1600px) 45vw, 760px',
  );

  private pointerStartX: number | null = null;

  protected next(): void {
    if (!this.hasMultiple()) {
      return;
    }

    this.activeIndex.update((index) => (index + 1) % this.total());
  }

  protected previous(): void {
    if (!this.hasMultiple()) {
      return;
    }

    this.activeIndex.update((index) => (index - 1 + this.total()) % this.total());
  }

  protected goTo(index: number): void {
    if (index < 0 || index >= this.total()) {
      return;
    }

    this.activeIndex.set(index);
  }

  /**
   * Only the active slide and its immediate neighbours are rendered. This keeps
   * the decoded-image memory bounded to a handful of screenshots instead of
   * the full gallery of every project.
   */
  protected isVisibleSlide(index: number): boolean {
    const total = this.total();

    if (total <= 1) {
      return index === 0;
    }

    const difference = Math.abs(index - this.activeIndex());
    const distance = Math.min(difference, total - difference);
    return distance <= 1;
  }

  /**
   * Responsive files live next to each screenshot using a fixed convention:
   * `-640`/`-960` for browser captures and `-480` for phone captures. Keep
   * these variants in sync when adding new project images.
   */
  protected imageSrcset(image: ProjectImage): string {
    const extensionIndex = image.src.lastIndexOf('.');

    if (extensionIndex <= 0) {
      return image.src;
    }

    const base = image.src.slice(0, extensionIndex);
    const extension = image.src.slice(extensionIndex);

    if (this.media() === 'phone') {
      return `${base}-480${extension} 480w, ${image.src} ${image.width}w`;
    }

    return `${base}-640${extension} 640w, ${base}-960${extension} 960w, ${image.src} ${image.width}w`;
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.hasMultiple()) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previous();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.goTo(this.total() - 1);
        break;
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    if (!this.hasMultiple() || event.button !== 0) {
      return;
    }

    this.pointerStartX = event.clientX;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.pointerStartX === null) {
      return;
    }

    const delta = event.clientX - this.pointerStartX;
    this.pointerStartX = null;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta > 0) {
      this.previous();
    } else {
      this.next();
    }
  }

  protected onPointerCancel(): void {
    this.pointerStartX = null;
  }
}
