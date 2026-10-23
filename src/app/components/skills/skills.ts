import { Component } from '@angular/core';
import { SkillGroup } from '../../models/Skills';
import { RevealDirective } from '../../directives/Reveal_directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Las uso a diario',
      description: 'El stack con el que construyo este portafolio y los proyectos Q-Sopa.',
      skills: [
        {
          name: 'Angular',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
        },
        {
          name: 'React',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        {
          name: 'TypeScript',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        },
        {
          name: 'JavaScript',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
          name: 'Spring Boot',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
        },
        {
          name: 'Java',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        },
        {
          name: 'PostgreSQL',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        },
        {
          name: 'Git',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        },
      ],
    },
    {
      title: 'Con experiencia básica / aprendiendo',
      description: 'Tecnologías que he explorado o usado en menor medida y sigo practicando.',
      skills: [
        {
          name: 'Node.js',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        {
          name: 'MySQL',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        },
        {
          name: 'Docker',
          iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        },
        {
          name: 'AWS',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
        },
      ],
    },
  ];
}
