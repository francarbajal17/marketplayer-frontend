import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-social.component.html',
  styleUrl: './player-social.component.css'
})
export class PlayerSocialComponent {
  @Input() socialNetworks: {
    instagram: string;
    twitter: string;
    facebook: string;
  } = { instagram: '', twitter: '', facebook: '' };
}
