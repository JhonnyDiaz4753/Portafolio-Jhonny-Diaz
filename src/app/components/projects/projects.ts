import { Component } from '@angular/core';
import { Project } from '../../models/Proyect';
import { RevealDirective } from '../../directives/Reveal_directive';
import { ProjectCarousel } from './project-carousel/project-carousel';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, ProjectCarousel],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
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
  ];
}
