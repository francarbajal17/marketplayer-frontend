import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlayerData {
  strPlayer: string;
  strCutout: string;
  strPosition: string;
  dateBorn: string;
  strTeam: string;
  strNationality: string;
  strHeight: string;
  strWeight: string;
  strDescriptionEN: string;
  strInstagram?: string;
  strTwitter?: string;
  strFacebook?: string;
  MP: number;
  Starts: number;
  Min: number;
  '90s': number;
  Gls: number;
  Ast: number;
  xG: number;
  xAG: number;
  'G-PK': number;
  PrgP: number;
  PrgC: number;
  KP: number;
  PPA: number;
  Tkl: number;
  TklW: number;
  Blocks_stats_defense: number;
  Int: number;
  Clr: number;
  Err: number;
  CrdY: number;
  CrdR: number;
  PKwon: number;
  PKcon: number;
  Recov: number;
  Touches?: number;
  Carries?: number;
  PrgR?: number;
  Mis?: number;
  Dis?: number;
  GA?: number;
  Saves?: number;
  'Save%'?: number;
  CS?: number;
  'CS%'?: number;
  PKA?: number;
  PKsv?: number;
  wikiData?: string;
}

export interface PlayerSearchResult {
  strPlayer: string;
}

export interface TopScorer {
  strPlayer: string;
  strCutout: string;
  Gls: number;
}

export interface TopGoalkeeper {
  strPlayer: string;
  strCutout: string;
  CS: number;
}

export interface TopDefender {
  strPlayer: string;
  strCutout: string;
  tackleEfficiency: string;
  Tkl: number;
  TklW: number;
  strPosition: string;
}

export interface TopTouches {
  strPlayer: string;
  strCutout: string;
  Touches: number;
}

export interface TopAssister {
  strPlayer: string;
  strCutout: string;
  Ast: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/api/player';
  private searchUrl = 'http://localhost:3000/api/search/players';

  constructor(private http: HttpClient) {}

  getPlayer(playerName: string): Observable<PlayerData> {
    return this.http.get<PlayerData>(`${this.apiUrl}/${playerName}`);
  }

  searchPlayers(query: string, limit: number = 5): Observable<PlayerSearchResult[]> {
    return this.http.get<PlayerSearchResult[]>(`${this.searchUrl}?q=${encodeURIComponent(query)}&limit=${limit}`);
  }

  getTopScorers(): Observable<TopScorer[]> {
    return this.http.get<TopScorer[]>('http://localhost:3000/api/top-goleadores');
  }

  getTopGoalkeepers(): Observable<TopGoalkeeper[]> {
    return this.http.get<TopGoalkeeper[]>('http://localhost:3000/api/top-goleros');
  }

  getTopDefenders(): Observable<TopDefender[]> {
    return this.http.get<TopDefender[]>('http://localhost:3000/api/top-defensas');
  }

  getTopTouches(): Observable<TopTouches[]> {
    return this.http.get<TopTouches[]>('http://localhost:3000/api/top-touches');
  }

  getTopAssisters(): Observable<TopAssister[]> {
    return this.http.get<TopAssister[]>('http://localhost:3000/api/top-asistidores');
  }
}
