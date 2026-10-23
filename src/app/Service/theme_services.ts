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
    // Keep the <html class="dark"> attribute in sync with the theme signal.
    // Guarded so it never touches the DOM during SSR. The theme is persisted
    // only when the user toggles it, so the first visit keeps following the
    // operating-system preference.
    effect(() => {
      const theme = this.theme();
      if (!this.isBrowser) {
        return;
      }
      document.documentElement.classList.toggle('dark', theme === 'dark');
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);

    if (this.isBrowser) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable (private mode, blocked cookies); the
        // in-memory theme still works for the current session.
      }
    }
  }

  private resolveInitialTheme(): Theme {
    if (!this.isBrowser) {
      // Default for the server-rendered HTML. The theme no longer changes
      // markup during SSR, so this value does not affect hydration.
      return 'dark';
    }

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Fall through to the OS preference.
    }

    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
}