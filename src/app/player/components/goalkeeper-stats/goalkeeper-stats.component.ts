import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goalkeeper-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goalkeeper-stats.component.html',
  styleUrl: './goalkeeper-stats.component.css'
})
export class GoalkeeperStatsComponent {
  @Input() stats: any;
}
