import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-description',
  standalone: true,
  imports: [],
  templateUrl: './player-description.component.html',
  styleUrl: './player-description.component.css'
})
export class PlayerDescriptionComponent {
  @Input() description: string = '';
}
