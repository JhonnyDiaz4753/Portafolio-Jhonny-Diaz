
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}
 
const ACCENT_A = '17,115,212'; // --color-primary (#1173d4)
const ACCENT_B = '99,179,237'; // lighter tint of primary, for variety
const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 140;
const DENSITY = 16000; // px^2 per particle — lower = more particles
const MAX_PARTICLES = 110;
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-particle-background',
  imports: [],
  templateUrl: './particle-background.html',
  styleUrl: './particle-background.css'
})
export class ParticleBackground implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
 
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private mouse = { x: -9999, y: -9999 };
  private reducedMotion = false;
  private animationFrameId = 0;
 
  private readonly onResize = () => this.resize();
  private readonly onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };
  private readonly onMouseLeave = () => {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  };
 
  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }
 
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
 
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseleave', this.onMouseLeave);
 
    this.resize();
    this.step();
  }
 
  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);
    cancelAnimationFrame(this.animationFrameId);
  }
 
  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
 
    canvas.width = this.width * this.dpr;
    canvas.height = this.height * this.dpr;
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
 
    this.initParticles();
  }
 
  private initParticles(): void {
    const count = Math.min(MAX_PARTICLES, Math.floor((this.width * this.height) / DENSITY));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.8,
      color: Math.random() > 0.5 ? ACCENT_A : ACCENT_B,
    }));
  }
 
  private step = (): void => {
    const { ctx, width, height, particles, mouse, reducedMotion } = this;
    ctx.clearRect(0, 0, width, height);
 
    for (const p of particles) {
      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
 
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += (dx / dist) * force * 1.1;
          p.y += (dy / dist) * force * 1.1;
        }
      }
 
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},0.55)`;
      ctx.fill();
    }
 
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DISTANCE) {
          ctx.strokeStyle = `rgba(${ACCENT_A},${0.12 * (1 - dist / LINK_DISTANCE)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
 
    if (!reducedMotion) {
      this.animationFrameId = requestAnimationFrame(this.step);
    }
  };
}
