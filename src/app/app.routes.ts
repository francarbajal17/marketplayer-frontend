import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { PlayerNotFoundComponent } from './player-not-found/player-not-found.component';
import { PlayersList } from './players-list/players-list';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ranking/:type',
    component: PlayersList
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
