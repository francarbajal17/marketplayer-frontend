import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-not-found',
  standalone: true,
  imports: [],
  templateUrl: './player-not-found.component.html',
  styleUrl: './player-not-found.component.css'
})
export class PlayerNotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
