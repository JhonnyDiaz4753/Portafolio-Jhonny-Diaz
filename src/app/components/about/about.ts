import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/Reveal_directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
