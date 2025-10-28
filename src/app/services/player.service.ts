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
}

export interface PlayerSearchResult {
  strPlayer: string;
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
}
