import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerHeaderComponent } from './components/player-header/player-header.component';
import { PlayerDescriptionComponent } from './components/player-description/player-description.component';
import { PlayerSocialComponent } from './components/player-social/player-social.component';
import { OutfieldStatsComponent } from './components/outfield-stats/outfield-stats.component';
import { GoalkeeperStatsComponent } from './components/goalkeeper-stats/goalkeeper-stats.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    PlayerHeaderComponent,
    PlayerDescriptionComponent,
    PlayerSocialComponent,
    OutfieldStatsComponent,
    GoalkeeperStatsComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  playerName: string = '';
  playerType: 'outfield' | 'goalkeeper' = 'outfield'; // Tipo de jugador
  
  // Datos de ejemplo de Valverde (jugador de campo)
  playerData: any = {
    name: 'Federico Valverde',
    photo: '/dsgdj11718088153.jpg',
    badges: [
      { text: 'Central Midfield', color: 'green' },
      { text: 'Important Player', color: 'orange' },
      // Puedes agregar más badges aquí fácilmente:
      // { text: 'Great Striker', color: 'red' }
    ],
    age: 27,
    birth: '1998-07-22',
    club: 'Real Madrid',
    nationality: 'Uruguay',
    height: '182 m (6 ft 0 in)',
    weight: '172 lbs',
    description: 'Federico Santiago Valverde Dipetta (born 22 July 1998) is a Uruguayan professional footballer who plays for Spanish club Real Madrid and the Uruguay national team as a central midfielder.',
    socialNetworks: {
      instagram: '@fedeevalverde',
      twitter: '@fedeevalverde',
      facebook: 'FedeValverdeOficial'
    },
    stats: {
      playingTime: {
        matchesPlayed: 36,
        gamesStarted: 34,
        minutesPlayed: 3032,
        fullMatchesCompleted: 33.7
      },
      possession: {
        touches: 6,
        carries: 4,
        progressiveRuns: 2.7,
        miscontrols: 3.1,
        timesDispossessed: 6
      },
      attacking: {
        goals: 6,
        assists: 4,
        expectedGoals: 2.7,
        expectedAssists: 3.1,
        goalsExcludingPenalties: 6
      },
      passing: {
        progressivePasses: 34,
        progressiveCarries: 34,
        keyPasses: 33.7,
        passCompletionPercentage: 33.7,
        passesIntoPenaltyArea: 6
      },
      defensive: {
        totalTackles: 34,
        tacklesWon: 34,
        blocksMade: 33.7,
        interceptions: 33.7,
        clearances: 6,
        errorsLeadingToGoals: 4
      },
      miscellaneous: {
        yellowCards: 34,
        redCards: 34,
        penaltiesWon: 33.7,
        penaltiesConceded: 33.7,
        ballRecoveries: 6
      }
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerName = params['playername'];
      console.log('Player name:', this.playerName);
      
      // Detectar tipo de jugador basado en el nombre (temporal - en producción vendría del backend)
      if (this.playerName.toLowerCase().includes('neuer')) {
        this.loadGoalkeeperData();
      }
      // Por defecto ya está cargado Valverde (outfield)
    });
  }

  // Método para cargar datos de portero (ejemplo: Manuel Neuer)
  loadGoalkeeperData(): void {
    this.playerType = 'goalkeeper';
    this.playerData = {
      name: 'Manuel Neuer',
      photo: '/Neuer.jpeg', // Cambiar por foto de Neuer cuando la agregues
      badges: [
        { text: 'Goalkeeper', color: 'pink' },
        { text: 'Penalty Saver', color: 'blue' }
      ],
      age: 38,
      birth: '1986-03-27',
      club: 'Bayern Munich',
      nationality: 'Germany',
      height: '1.93 m (6 ft 4 in)',
      weight: '203 lbs',
      description: 'Manuel Peter Neuer (born 27 March 1986) is a German professional footballer who plays as a goalkeeper for and captains Bundesliga club Bayern Munich. Widely regarded as one of the greatest and most influential goalkeepers in the history of the sport, Neuer has been described as a "sweeper-keeper" because of his playing style and speed when rushing off his line to anticipate opponents, going out of the penalty area.',
      socialNetworks: {
        instagram: '@manuelneuer',
        twitter: '@Manuel_Neuer',
        facebook: 'manuel.neuer'
      },
      stats: {
        playingTime: {
          matchesPlayed: 22,
          gamesStarted: 22,
          minutesPlayed: 1980,
          fullMatchesCompleted: 22
        },
        miscellaneous: {
          yellowCards: 0,
          redCards: 0,
          penaltiesWon: 0,
          penaltiesConceded: 0,
          ballRecoveries: 92
        },
        goalkeeper: {
          goalsConceded: 15,
          saves: 45,
          savePercentage: 68.9,
          cleanSheets: 13,
          cleanSheetsPercentage: 59.1,
          penaltyKicksAgainst: 3,
          penaltyKicksSaved: 0
        }
      }
    };
  }
}
