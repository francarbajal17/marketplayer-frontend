import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outfield-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfield-stats.component.html',
  styleUrl: './outfield-stats.component.css'
})
export class OutfieldStatsComponent {
  @Input() stats: any;
}
