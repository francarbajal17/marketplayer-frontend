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

  getSocialUrl(platform: string, handle: string): string {
    if (!handle) return '';
    
    // Remove @ if present
    const cleanHandle = handle.replace('@', '');
    
    switch(platform) {
      case 'instagram':
        return `https://${cleanHandle}`;
      case 'twitter':
        return `https://${cleanHandle}`;
      case 'facebook':
        return `https://${cleanHandle}`;
      default:
        return '';
    }
  }

  hasSocialNetworks(): boolean {
    return !!(this.socialNetworks.instagram || this.socialNetworks.twitter || this.socialNetworks.facebook);
  }
}
