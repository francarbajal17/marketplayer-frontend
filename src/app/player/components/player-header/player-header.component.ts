import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-header.component.html',
  styleUrl: './player-header.component.css'
})
export class PlayerHeaderComponent {
  @Input() name: string = '';
  @Input() photo: string = '';
  @Input() badges: Array<{text: string, color: string}> = [];
  @Input() age: number = 0;
  @Input() birth: string = '';
  @Input() club: string = '';
  @Input() nationality: string = '';
  @Input() height: string = '';
  @Input() weight: string = '';
}
