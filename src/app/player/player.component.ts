import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerHeaderComponent } from './components/player-header/player-header.component';
import { PlayerDescriptionComponent } from './components/player-description/player-description.component';
import { PlayerSocialComponent } from './components/player-social/player-social.component';
import { OutfieldStatsComponent } from './components/outfield-stats/outfield-stats.component';
import { GoalkeeperStatsComponent } from './components/goalkeeper-stats/goalkeeper-stats.component';
import { PlayerService, PlayerData } from '../services/player.service';
import { JsonLDComponent } from './components/json-ld/json-ld.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    PlayerHeaderComponent,
    PlayerDescriptionComponent,
    PlayerSocialComponent,
    OutfieldStatsComponent,
    GoalkeeperStatsComponent,
    JsonLDComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  playerName: string = '';
  playerType: 'outfield' | 'goalkeeper' = 'outfield';
  playerData: any = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerName = params['playername'];
      this.loadPlayerData();
    });
  }

  loadPlayerData(): void {
    this.isLoading = true;
    this.playerService.getPlayer(this.playerName).subscribe({
      next: (data: PlayerData) => {
        this.playerType = data.strPosition === 'Goalkeeper' ? 'goalkeeper' : 'outfield';
        this.playerData = this.transformPlayerData(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading player:', error);
        this.router.navigate(['/player-not-found']);
      }
    });
  }

  transformPlayerData(data: PlayerData): any {
    const badges = this.generateBadges(data);
    const age = this.calculateAge(data.dateBorn);

    return {
      name: data.strPlayer,
      photo: data.strCutout || '/default-player.png',
      badges: badges,
      age: age,
      birth: data.dateBorn,
      club: data.strTeam,
      nationality: data.strNationality,
      height: data.strHeight,
      weight: data.strWeight,
      description: data.strDescriptionEN || 'No description available.',
      socialNetworks: {
        instagram: data.strInstagram || '',
        twitter: data.strTwitter || '',
        facebook: data.strFacebook || ''
      },
      stats: this.playerType === 'goalkeeper' ? this.transformGoalkeeperStats(data) : this.transformOutfieldStats(data),
      wikiData: data.wikiData || ''
    };
  }

  generateBadges(data: PlayerData): Array<{text: string, color: string}> {
    const badges: Array<{text: string, color: string}> = [];

    // Position badge
    const position = data.strPosition;
    if (position === 'Goalkeeper') {
      badges.push({ text: 'Goalkeeper', color: 'pink' });
    } else if (position === 'Center-Back' || position === 'Centre-Back' || position === 'Right-Back' || position === 'Left-Back') {
      badges.push({ text: position, color: 'blue' });
    } else if (position === 'Central Midfield') {
      badges.push({ text: 'Central Midfield', color: 'green' });
    } else if (position === 'Centre-Forward' || position === 'Left Wing' || position === 'Right Winger') {
      badges.push({ text: position, color: 'purple' }); // Purple for forwards
    } else if (position) {
      badges.push({ text: position, color: 'gray' });
    }

    // Important Player badge (MP > 35)
    if (data.MP > 35) {
      badges.push({ text: 'Important Player', color: 'orange' });
    }

    // Striker badge (Gls > 15)
    if (data.Gls > 15) {
      badges.push({ text: 'Striker', color: 'red' }); // Red for striker
    }

    // Assister badge (Ast > 8)
    if (data.Ast > 8) {
      badges.push({ text: 'Great Assister', color: 'green' }); // Green for assister
    }

    // Angry badge (Ast > 8)
    if (data.CrdY > 10) {
      badges.push({ text: 'Angry player', color: 'red' }); // Red for angry player
    }

    // Ball recoverier badge (Recov > 100)
    if (data.Recov > 100) {
      badges.push({ text: 'Fisherman', color: 'blue' }); // Blue for fisherman player
    }

    return badges;
  }

  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  transformOutfieldStats(data: PlayerData): any {
    return {
      playingTime: {
        matchesPlayed: data.MP,
        gamesStarted: data.Starts,
        minutesPlayed: data.Min,
        fullMatchesCompleted: data['90s']
      },
      possession: {
        touches: data.Touches || 0,
        carries: data.Carries || 0,
        progressiveRuns: data.PrgR || 0,
        miscontrols: data.Mis || 0,
        timesDispossessed: data.Dis || 0
      },
      attacking: {
        goals: data.Gls,
        assists: data.Ast,
        expectedGoals: data.xG,
        expectedAssists: data.xAG,
        goalsExcludingPenalties: data['G-PK']
      },
      passing: {
        progressivePasses: data.PrgP,
        progressiveCarries: data.PrgC,
        keyPasses: data.KP,
        passesIntoPenaltyArea: data.PPA
      },
      defensive: {
        totalTackles: data.Tkl,
        tacklesWon: data.TklW,
        blocksMade: data.Blocks_stats_defense,
        interceptions: data.Int,
        clearances: data.Clr,
        errorsLeadingToGoals: data.Err
      },
      miscellaneous: {
        yellowCards: data.CrdY,
        redCards: data.CrdR,
        penaltiesWon: data.PKwon,
        penaltiesConceded: data.PKcon,
        ballRecoveries: data.Recov
      }
    };
  }

  transformGoalkeeperStats(data: PlayerData): any {
    return {
      playingTime: {
        matchesPlayed: data.MP,
        gamesStarted: data.Starts,
        minutesPlayed: data.Min,
        fullMatchesCompleted: data['90s']
      },
      miscellaneous: {
        yellowCards: data.CrdY,
        redCards: data.CrdR,
        penaltiesWon: data.PKwon,
        penaltiesConceded: data.PKcon,
        ballRecoveries: data.Recov
      },
      goalkeeper: {
        goalsConceded: data.GA || 0,
        saves: data.Saves || 0,
        savePercentage: data['Save%'] || 0,
        cleanSheets: data.CS || 0,
        cleanSheetsPercentage: data['CS%'] || 0,
        penaltyKicksAgainst: data.PKA || 0,
        penaltyKicksSaved: data.PKsv || 0
      }
    };
  }
}
