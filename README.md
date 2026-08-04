# Portafolio — Jhonny Diaz Centeno

Portafolio personal donde muestro mis proyectos como desarrollador full stack. Construido con Angular 20 (standalone components + SSR) y Tailwind CSS.

🔗 **Demo en vivo:** [portafolio-jhonny-diaz.vercel.app](https://portafolio-jhonny-diaz.vercel.app/)

## Sobre mí

Desarrollador web full stack con experiencia práctica en el ciclo completo de desarrollo: diseño de APIs REST con Spring Boot, integración frontend con Angular y React, gestión de bases de datos relacionales con PostgreSQL y despliegue en plataformas como Render y Railway.

## Stack técnico de este portafolio

- **Framework:** Angular 20 (standalone components, signals, control flow `@for`)
- **Renderizado:** Server-Side Rendering (SSR) con Express
- **Estilos:** Tailwind CSS 4
- **Deploy:** Vercel

## Características

- 🌗 Modo claro/oscuro persistente, con detección automática de la preferencia del sistema
- 📱 Totalmente responsive, con menú lateral (drawer) en móvil
- ⚡ Imágenes optimizadas en WebP con `NgOptimizedImage` (lazy-loading + prevención de layout shift)
- 🧩 Contenido de proyectos y habilidades data-driven (arrays tipados en TypeScript), no hardcodeado en el HTML

## Proyectos destacados

| Proyecto | Descripción | Demo | Repo |
|---|---|---|---|
| **Admin Q-sopa** | Panel de administración full-stack para restaurante: CRUD, POS, historial de ventas y dashboard de estadísticas | [Ver demo](https://admin-q-sopa.vercel.app/) | [GitHub](https://github.com/JhonnyDiaz4753/Admin_Q_sopa) |
| **Q-Sopa** | Menú digital para restaurante con navegación por categorías en tiempo real vía API REST propia | [Ver demo](https://qsopav01.vercel.app/) | [GitHub](https://github.com/JhonnyDiaz4753/Q_sopa) |

## Correr el proyecto localmente

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/JhonnyDiaz4753/Portafolio-Jhonny-Diaz.git
cd Portafolio-Jhonny-Diaz
npm install
```

Levanta el servidor de desarrollo:

```bash
ng serve
```

Abre `http://localhost:4200/` en el navegador. La app se recarga automáticamente al modificar los archivos fuente.

### Build de producción

```bash
ng build
```

Los artefactos de build quedan en `dist/portafolio`.

### Tests unitarios

```bash
ng test
```

## Contacto

- LinkedIn: [Jhonny Diaz Centeno](http://www.linkedin.com/in/jhonny-diaz-centeno-567225378)
- GitHub: [@JhonnyDiaz4753](https://github.com/JhonnyDiaz4753)

---

Generado originalmente con [Angular CLI](https://github.com/angular/angular-cli) v20.3.4.