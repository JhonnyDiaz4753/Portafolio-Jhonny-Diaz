import { Component } from '@angular/core';
import { Project } from '../../models/Proyect';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  readonly projects: Project[] = [
    {
      id: 'admin-q-sopa',
      title: 'Admin Q-sopa',
      description:
        'Panel de administración full-stack para la gestión completa del restaurante. Incluye CRUD de productos, categorías e ingredientes, un POS para registrar ventas con soporte para efectivo, tarjeta y transferencia, historial de ventas con detalle por orden, y un dashboard con estadísticas de ingresos y productos más vendidos.',
      imageUrl: '/images/Admin_Q.webp',
      imageAlt: 'Panel de administración Admin Q-sopa',
      technologies: ['React', 'Vite', 'Spring Boot', 'PostgreSQL', 'Supabase', 'Railway', 'REST API', 'CSS responsivo'],
      demoUrl: 'https://admin-q-sopa.vercel.app/',
      repoUrl: 'https://github.com/JhonnyDiaz4753/Admin_Q_sopa'
    },
    {
      id: 'q-sopa',
      title: 'Q_Sopa - Menú Digital para Restaurantes',
      description:
        'Q-Sopa es una aplicación web de menú digital para restaurante, desarrollada con React en el frontend y Spring Boot en el backend, conectada a una base de datos PostgreSQL desplegada en Railway. Permite explorar productos organizados por categorías en tiempo real a través de una API REST propia, con un diseño completamente responsive que adapta la navegación a móvil mediante un drawer lateral. Cada decisión técnica —desde la arquitectura hasta la UI— fue diseñada e implementada de forma independiente.',
      imageUrl: '/images/menu_web.webp',
      imageAlt: 'Menú digital Q-Sopa',
      technologies: ['React', 'Spring Boot', 'PostgreSQL', 'Railway', 'REST API', 'CSS responsivo'],
      demoUrl: 'https://qsopav01.vercel.app/',
      repoUrl: 'https://github.com/JhonnyDiaz4753/Q_sopa'
    }
  ];
}