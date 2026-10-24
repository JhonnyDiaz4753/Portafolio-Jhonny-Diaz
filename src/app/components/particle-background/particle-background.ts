import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const ACCENT_A = '166,163,255';
const ACCENT_B = '97,217,238';
const LINK_DISTANCE = 130;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
const MOUSE_RADIUS = 140;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const DENSITY = 16000; // px^2 per particle — lower = more particles
const MAX_PARTICLES = 110;
const TARGET_FRAME_MS = 1000 / 30;
const MOBILE_QUERY = '(pointer: coarse), (max-width: 820px)';
const SCROLL_PAUSE_FACTOR = 1.5;

@Component({
  selector: 'app-particle-background',
  imports: [],
  templateUrl: './particle-background.html',
  styleUrl: './particle-background.css',
})
export class ParticleBackground implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private mouse = { x: -9999, y: -9999 };
  private reducedMotion = false;
  private active = false;
  private running = false;
  private animationFrameId = 0;
  private resizeFrameId = 0;
  private lastFrameTime = 0;
  private mobileQuery: MediaQueryList | null = null;

  private readonly onResize = (): void => {
    if (!this.active || this.resizeFrameId) {
      return;
    }

    this.resizeFrameId = requestAnimationFrame(() => {
      this.resizeFrameId = 0;

      if (!this.active) {
        return;
      }

      this.resize();
      if (!this.running) {
        this.draw();
      }
    });
  };

  private readonly onVisibilityChange = (): void => {
    if (document.hidden) {
      this.stop();
      return;
    }

    if (this.active && !this.reducedMotion) {
      this.start();
    }
  };

  private readonly onScroll = (): void => {
    if (!this.active || this.reducedMotion) {
      return;
    }

    if (window.scrollY < window.innerHeight * SCROLL_PAUSE_FACTOR) {
      this.start();
    } else {
      this.stop();
    }
  };

  private readonly onMobileQueryChange = (event: MediaQueryListEvent): void => {
    if (event.matches) {
      this.deactivate();
    } else {
      this.activate();
    }
  };

  private readonly onMouseMove = (event: MouseEvent): void => {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  };

  private readonly onMouseLeave = (): void => {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  };

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.mobileQuery = window.matchMedia(MOBILE_QUERY);

    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.mobileQuery.addEventListener('change', this.onMobileQueryChange);

    if (!this.mobileQuery.matches) {
      this.activate();
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.mobileQuery?.removeEventListener('change', this.onMobileQueryChange);

    this.deactivate();
    cancelAnimationFrame(this.resizeFrameId);
  }

  private activate(): void {
    if (!this.ctx || !this.isBrowser || this.mobileQuery?.matches) {
      return;
    }

    this.active = true;
    this.addInteractionListeners();
    this.resize();

    if (!this.reducedMotion) {
      this.start();
    } else {
      this.draw();
    }
  }

  private deactivate(): void {
    this.active = false;
    this.stop();
    this.removeInteractionListeners();
    this.mouse.x = -9999;
    this.mouse.y = -9999;
    this.ctx?.clearRect(0, 0, this.width, this.height);
  }

  private addInteractionListeners(): void {
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
  }

  private removeInteractionListeners(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
  }

  private start(): void {
    if (
      !this.active ||
      this.running ||
      this.reducedMotion ||
      document.hidden ||
      window.scrollY >= window.innerHeight * SCROLL_PAUSE_FACTOR
    ) {
      return;
    }

    this.running = true;
    this.lastFrameTime = 0;
    this.animationFrameId = requestAnimationFrame(this.step);
  }

  private stop(): void {
    this.running = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  private readonly step = (time: number): void => {
    if (!this.running) {
      return;
    }

    if (time - this.lastFrameTime < TARGET_FRAME_MS) {
      this.animationFrameId = requestAnimationFrame(this.step);
      return;
    }

    this.lastFrameTime = time;
    this.draw();

    if (this.running) {
      this.animationFrameId = requestAnimationFrame(this.step);
    }
  };

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    if (width === this.width && height === this.height && dpr === this.dpr && canvas.width > 0) {
      return;
    }

    this.width = width;
    this.height = height;
    this.dpr = dpr;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.syncParticles();
  }

  private syncParticles(): void {
    const target = Math.min(
      MAX_PARTICLES,
      Math.max(6, Math.floor((this.width * this.height) / DENSITY)),
    );

    while (this.particles.length < target) {
      this.particles.push(this.createParticle());
    }

    if (this.particles.length > target) {
      this.particles.length = target;
    }

    for (const particle of this.particles) {
      particle.x = Math.min(Math.max(particle.x, 0), this.width);
      particle.y = Math.min(Math.max(particle.y, 0), this.height);
    }
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.8,
      color: Math.random() > 0.5 ? ACCENT_A : ACCENT_B,
    };
  }

  private draw(): void {
    const ctx = this.ctx;

    if (!ctx || !this.width || !this.height) {
      return;
    }

    ctx.clearRect(0, 0, this.width, this.height);

    if (!this.reducedMotion) {
      for (const particle of this.particles) {
        this.updateParticle(particle);
      }
    }

    this.drawParticles(ACCENT_A);
    this.drawParticles(ACCENT_B);
    this.drawLinks();
  }

  private updateParticle(particle: Particle): void {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > this.width) {
      particle.vx *= -1;
    }
    if (particle.y < 0 || particle.y > this.height) {
      particle.vy *= -1;
    }

    const dx = particle.x - this.mouse.x;
    const dy = particle.y - this.mouse.y;
    const distanceSq = dx * dx + dy * dy;

    if (distanceSq > 0.25 && distanceSq < MOUSE_RADIUS_SQ) {
      const distance = Math.sqrt(distanceSq);
      const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
      particle.x += (dx / distance) * force * 1.1;
      particle.y += (dy / distance) * force * 1.1;
    }
  }

  private drawParticles(color: string): void {
    const ctx = this.ctx;

    if (!ctx) {
      return;
    }

    let hasParticles = false;
    ctx.beginPath();

    for (const particle of this.particles) {
      if (particle.color !== color) {
        continue;
      }

      hasParticles = true;
      ctx.moveTo(particle.x + particle.r, particle.y);
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    }

    if (!hasParticles) {
      return;
    }

    ctx.fillStyle = `rgba(${color},0.55)`;
    ctx.fill();
  }

  private drawLinks(): void {
    const ctx = this.ctx;

    if (!ctx) {
      return;
    }

    const buckets: number[][] = [[], [], [], []];

    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq >= LINK_DISTANCE_SQ) {
          continue;
        }

        const strength = 1 - Math.sqrt(distanceSq) / LINK_DISTANCE;
        const bucket = Math.min(3, Math.floor(strength * 4));
        buckets[bucket].push(a.x, a.y, b.x, b.y);
      }
    }

    ctx.lineWidth = 1;

    for (let bucket = 0; bucket < buckets.length; bucket++) {
      const lines = buckets[bucket];

      if (lines.length === 0) {
        continue;
      }

      ctx.beginPath();

      for (let index = 0; index < lines.length; index += 4) {
        ctx.moveTo(lines[index], lines[index + 1]);
        ctx.lineTo(lines[index + 2], lines[index + 3]);
      }

      ctx.strokeStyle = `rgba(${ACCENT_A},${(bucket + 1) * 0.03})`;
      ctx.stroke();
    }
  }
}
