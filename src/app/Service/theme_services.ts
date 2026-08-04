import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.resolveInitialTheme());

  constructor() {
    // Keep the <html class="dark"> attribute and localStorage in sync
    // with the theme signal. Guarded so it never touches the DOM during SSR.
    effect(() => {
      const theme = this.theme();
      if (!this.isBrowser) {
        return;
      }
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    });
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      // Default for the server-rendered HTML; the effect above corrects
      // it on the client as soon as the app boots, if needed.
      return 'dark';
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
}