import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { ProjectImage } from '../../../models/Proyect';

@Component({
  selector: 'app-project-carousel',
  host: { '[class.project-carousel-host--featured]': 'featured()' },
  imports: [NgOptimizedImage],
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
