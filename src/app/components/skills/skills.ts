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
        { name: 'Angular', iconUrl: '/icons/angular.svg' },
        { name: 'React', iconUrl: '/icons/react.svg' },
        { name: 'TypeScript', iconUrl: '/icons/typescript.svg' },
        { name: 'JavaScript', iconUrl: '/icons/javascript.svg' },
        { name: 'Spring Boot', iconUrl: '/icons/spring.svg' },
        { name: 'Java', iconUrl: '/icons/java.svg' },
        { name: 'PostgreSQL', iconUrl: '/icons/postgresql.svg' },
        { name: 'Git', iconUrl: '/icons/git.svg' },
      ],
    },
    {
      title: 'Con experiencia básica / aprendiendo',
      description: 'Tecnologías que he explorado o usado en menor medida y sigo practicando.',
      skills: [
        { name: 'Node.js', iconUrl: '/icons/nodejs.svg' },
        { name: 'MySQL', iconUrl: '/icons/mysql.svg' },
        { name: 'Docker', iconUrl: '/icons/docker.svg' },
        { name: 'AWS', iconUrl: '/icons/aws.svg' },
      ],
    },
  ];
}
