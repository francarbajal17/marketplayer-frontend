import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService, TopScorer, TopGoalkeeper, TopDefender, TopTouches, TopAssister } from '../services/player.service';

type RankingType = 'scorers' | 'goalkeepers' | 'defenders' | 'touches' | 'assisters';

interface PlayerListItem {
  strPlayer: string;
  strCutout: string;
  statValue: number | string;
  statLabel: string;
  additionalInfo?: string;
}

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players-list.html',
  styleUrl: './players-list.css'
})
export class PlayersList implements OnInit {
  rankingType: RankingType = 'scorers';
  title: string = '';
  players: PlayerListItem[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rankingType = params['type'] as RankingType;
      this.loadRankingData();
    });
  }

  loadRankingData(): void {
    this.isLoading = true;
    
    switch (this.rankingType) {
      case 'scorers':
        this.title = 'Mayores Goleadores';
        this.playerService.getTopScorers().subscribe({
          next: (data) => {
            this.players = data.map(p => ({
              strPlayer: p.strPlayer,
              strCutout: p.strCutout,
              statValue: p.Gls,
              statLabel: 'Goles'
            }));
            this.isLoading = false;
          },
          error: (err) => this.handleError(err)
        });
        break;

      case 'goalkeepers':
        this.title = 'Arqueros con Más Vallas Invictas';
        this.playerService.getTopGoalkeepers().subscribe({
          next: (data) => {
            this.players = data.map(p => ({
              strPlayer: p.strPlayer,
              strCutout: p.strCutout,
              statValue: p.CS,
              statLabel: 'Vallas Invictas'
            }));
            this.isLoading = false;
          },
          error: (err) => this.handleError(err)
        });
        break;

      case 'defenders':
        this.title = 'Defensores con Mayor Eficacia en Barridas';
        this.playerService.getTopDefenders().subscribe({
          next: (data) => {
            this.players = data.map(p => ({
              strPlayer: p.strPlayer,
              strCutout: p.strCutout,
              statValue: `${p.tackleEfficiency}%`,
              statLabel: 'Eficacia',
              additionalInfo: `${p.TklW}/${p.Tkl} barridas`
            }));
            this.isLoading = false;
          },
          error: (err) => this.handleError(err)
        });
        break;

      case 'touches':
        this.title = 'Jugadores con Mayor Contacto de Balón';
        this.playerService.getTopTouches().subscribe({
          next: (data) => {
            this.players = data.map(p => ({
              strPlayer: p.strPlayer,
              strCutout: p.strCutout,
              statValue: p.Touches,
              statLabel: 'Toques'
            }));
            this.isLoading = false;
          },
          error: (err) => this.handleError(err)
        });
        break;

      case 'assisters':
        this.title = 'Mayores Asistidores';
        this.playerService.getTopAssisters().subscribe({
          next: (data) => {
            this.players = data.map(p => ({
              strPlayer: p.strPlayer,
              strCutout: p.strCutout,
              statValue: p.Ast,
              statLabel: 'Asistencias'
            }));
            this.isLoading = false;
          },
          error: (err) => this.handleError(err)
        });
        break;
    }
  }

  handleError(error: any): void {
    console.error('Error loading ranking:', error);
    this.isLoading = false;
  }

  goToPlayer(playerName: string): void {
    this.router.navigate(['/player', playerName]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
