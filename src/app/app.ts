import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Footer } from './components/footer/footer';
import {Skills} from './components/skills/skills';
import { ParticleBackground } from './components/particle-background/particle-background';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [Skills, ParticleBackground, Header, Hero, About, Projects, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portafolio');

}
