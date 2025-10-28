import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { PlayerNotFoundComponent } from './player-not-found/player-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'player/:playername',
    component: PlayerComponent
  },
  {
    path: 'player-not-found',
    component: PlayerNotFoundComponent
  }
];
