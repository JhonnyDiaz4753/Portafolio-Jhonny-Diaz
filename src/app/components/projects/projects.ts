import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Project } from '../../models/Proyect';
import { RevealDirective } from '../../directives/Reveal_directive';
import { ProjectCarousel } from './project-carousel/project-carousel';

const AUTOPLAY_DELAY_MS = 7000;

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, ProjectCarousel],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnDestroy {
  readonly projects: Project[] = [
    {
      id: 'admin-q-sopa',
      title: 'Admin Q-sopa',
      description:
        'Panel de administración full-stack para la gestión completa del restaurante. Incluye CRUD de productos, categorías e ingredientes, un POS para registrar ventas con soporte para efectivo, tarjeta y transferencia, historial de ventas con detalle por orden, y un dashboard con estadísticas de ingresos y productos más vendidos. El panel requiere inicio de sesión; si quieres probarlo, escríbeme y te comparto un acceso de demostración.',
      images: [
        {
          src: '/images/Admin_Q/Admin_Q.webp',
          alt: 'Dashboard de Admin Q-sopa con ventas, ingresos y gráficos estadísticos',
          width: 1361,
          height: 948,
        },
        {
          src: '/images/Admin_Q/pos-caja.webp',
          alt: 'POS de Admin Q-sopa con catálogo de productos y resumen de la orden',
          width: 1361,
          height: 948,
        },
        {
          src: '/images/Admin_Q/productos.webp',
          alt: 'Listado y gestión de productos en Admin Q-sopa',
          width: 1361,
          height: 948,
        },
        {
          src: '/images/Admin_Q/categorias.webp',
          alt: 'Gestión de categorías del menú en Admin Q-sopa',
          width: 1361,
          height: 948,
        },
        {
          src: '/images/Admin_Q/ingredientes.webp',
          alt: 'Gestión de ingredientes en Admin Q-sopa',
          width: 1361,
          height: 948,
        },
        {
          src: '/images/Admin_Q/historial.webp',
          alt: 'Historial de ventas de Admin Q-sopa con totales y detalle por orden',
          width: 1361,
          height: 948,
        },
        {
          src: '/images/Admin_Q/login.webp',
          alt: 'Pantalla de inicio de sesión de Admin Q-sopa',
          width: 1361,
          height: 948,
        },
      ],
      media: 'browser',
      technologies: [
        'React',
        'Vite',
        'Spring Boot',
        'PostgreSQL',
        'Supabase',
        'Railway',
        'REST API',
        'CSS responsivo',
      ],
      demoUrl: 'https://admin-q-sopa.vercel.app/',
      repoUrl: 'https://github.com/JhonnyDiaz4753/Admin_Q_sopa',
    },
    {
      id: 'q-sopa',
      title: 'Q_Sopa - Menú Digital para Restaurantes',
      description:
        'Q-Sopa es una aplicación web de menú digital para restaurante, desarrollada con React en el frontend y Spring Boot en el backend, conectada a una base de datos PostgreSQL desplegada en Railway. Permite explorar productos organizados por categorías en tiempo real a través de una API REST propia, con un diseño completamente responsive que adapta la navegación a móvil mediante un drawer lateral. Cada decisión técnica —desde la arquitectura hasta la UI— fue diseñada e implementada de forma independiente.',
      images: [
        {
          src: '/images/Q_Sopa/menu_web.webp',
          alt: 'Menú digital Q-Sopa',
          width: 1361,
          height: 948,
        },
      ],
      media: 'browser',
      technologies: [
        'React',
        'Spring Boot',
        'PostgreSQL',
        'Railway',
        'REST API',
        'CSS responsivo',
      ],
      demoUrl: 'https://qsopav01.vercel.app/',
      repoUrl: 'https://github.com/JhonnyDiaz4753/Q_sopa',
    },
    {
      id: 'gym-routine-lab',
      title: 'GymRoutineLab',
      description:
        'App móvil de entrenamiento personal construida con Angular, Ionic y Capacitor. Permite iniciar sesión con Google, consultar y crear rutinas sincronizadas con una API REST, generar rutinas automáticas según objetivo, nivel y equipamiento, registrar cada serie del entrenamiento, entrenar con asistencia por voz y visualizar el progreso semanal. Se empaqueta para Android y usa Supabase para la autenticación.',
      images: [
        {
          src: '/images/GymRoutineLab/login.webp',
          alt: 'Pantalla de inicio de sesión de GymRoutineLab',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/inicio.webp',
          alt: 'Panel de inicio de GymRoutineLab con la rutina del día y el progreso semanal',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/rutinas.webp',
          alt: 'Listado de rutinas de GymRoutineLab',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/detalle-rutina.webp',
          alt: 'Detalle de una rutina en GymRoutineLab',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/generar.webp',
          alt: 'Pantalla para configurar y generar una rutina automática en GymRoutineLab',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/entrenamiento.webp',
          alt: 'Entrenamiento en curso en GymRoutineLab con asistencia por voz y registro de series',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/descanso.webp',
          alt: 'Temporizador de descanso activo en GymRoutineLab',
          width: 720,
          height: 1603,
        },
        {
          src: '/images/GymRoutineLab/progreso.webp',
          alt: 'Panel de progreso de GymRoutineLab con estadísticas y progresión de fuerza',
          width: 720,
          height: 1603,
        },
      ],
      media: 'phone',
      featured: true,
      private: true,
      technologies: ['Angular', 'Ionic', 'Capacitor', 'TypeScript', 'Supabase', 'REST API'],
    },
    {
      id: 'rag-multimodal',
      title: 'RAG Multimodal',
      description:
        'Sistema RAG para manuales técnicos en PDF que extrae texto, tablas, diagramas e imágenes y responde preguntas citando la fuente exacta. Usa arquitectura hexagonal, ingesta asíncrona de documentos y búsqueda híbrida densa + BM25 con fusión RRF. Incluye cliente web con chat, historial, filtros por documento y visualización de imágenes recuperadas.',
      images: [
        {
          src: '/images/Rag_multimodal/ragMultimodal.webp',
          alt: 'Interfaz de RAG Multimodal con carga de manuales y consultas sobre documentos',
          width: 1917,
          height: 1027,
        },
      ],
      media: 'browser',
      featured: true,
      technologies: [
        'Python',
        'FastAPI',
        'Celery',
        'Redis',
        'Qdrant',
        'Ollama',
        'OpenAI',
        'Docker',
        'Nginx',
      ],
      repoUrl: 'https://github.com/JhonnyDiaz4753/Rag-Multimodal.git',
    },
  ];

  protected readonly activeIndex = signal(0);
  protected readonly total = this.projects.length;
  protected readonly activeProject = computed(() => this.projects[this.activeIndex()]);
  protected readonly autoplayPaused = signal(false);
  protected readonly autoplayLabel = computed(() =>
    this.autoplayPaused()
      ? 'Reanudar el cambio automático de proyecto'
      : 'Pausar el cambio automático de proyecto',
  );

  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ready = signal(false);
  private readonly hoverPaused = signal(false);
  private readonly focusPaused = signal(false);
  private readonly sectionVisible = signal(false);
  private readonly pageVisible = signal(true);
  private readonly restartToken = signal(0);

  /**
   * Autoplay only runs when the section is visible, the tab is active and the
   * visitor is not hovering or focusing the card. The explicit pause button is
   * independent from those temporary pauses, so it always wins.
   */
  private readonly canAutoplay = computed(
    () =>
      this.ready() &&
      !this.autoplayPaused() &&
      !this.hoverPaused() &&
      !this.focusPaused() &&
      this.sectionVisible() &&
      this.pageVisible(),
  );

  private observer?: IntersectionObserver;

  private readonly onVisibilityChange = (): void => {
    this.pageVisible.set(!document.hidden);
  };

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.autoplayPaused.set(true);
      }

      this.pageVisible.set(!document.hidden);

      this.observer = new IntersectionObserver(
        ([entry]) => this.sectionVisible.set(entry.isIntersecting),
        { threshold: 0.2 },
      );
      this.observer.observe(this.host.nativeElement);

      document.addEventListener('visibilitychange', this.onVisibilityChange);
      this.ready.set(true);
    });

    effect((onCleanup) => {
      this.restartToken();

      if (!this.canAutoplay()) {
        return;
      }

      const timer = setInterval(() => this.advance(), AUTOPLAY_DELAY_MS);
      onCleanup(() => clearInterval(timer));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();

    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
  }

  protected goTo(index: number): void {
    if (index < 0 || index >= this.total) {
      return;
    }

    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  protected nextProject(): void {
    this.activeIndex.update((index) => (index + 1) % this.total);
    this.restartAutoplay();
  }

  protected previousProject(): void {
    this.activeIndex.update((index) => (index - 1 + this.total) % this.total);
    this.restartAutoplay();
  }

  protected formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }

  protected shortTitle(project: Project): string {
    return project.title.split(' - ')[0];
  }

  protected toggleAutoplay(): void {
    this.autoplayPaused.update((paused) => !paused);
  }

  protected onHoverStart(): void {
    this.hoverPaused.set(true);
  }

  protected onHoverEnd(): void {
    this.hoverPaused.set(false);
  }

  protected onFocusIn(): void {
    this.focusPaused.set(true);
  }

  protected onFocusOut(event: FocusEvent): void {
    const stage = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;

    if (!nextTarget || !stage.contains(nextTarget)) {
      this.focusPaused.set(false);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousProject();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextProject();
        break;
      case 'Home':
        event.preventDefault();
        this.goTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.goTo(this.total - 1);
        break;
    }
  }

  private advance(): void {
    this.activeIndex.update((index) => (index + 1) % this.total);
  }

  /**
   * Restarts the countdown after a manual interaction so the chosen project
   * stays on screen for a full interval before autoplay moves on.
   */
  private restartAutoplay(): void {
    this.restartToken.update((token) => token + 1);
  }
}
