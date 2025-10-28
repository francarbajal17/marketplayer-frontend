import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PlayerService, PlayerSearchResult } from '../services/player.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  suggestions: PlayerSearchResult[] = [];
  isLoading: boolean = false;
  showSuggestions: boolean = false;
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Setup debouncing for search
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only emit if value changed
      switchMap(query => {
        if (query.trim().length > 0) {
          this.isLoading = true;
          return this.playerService.searchPlayers(query, 5);
        } else {
          this.isLoading = false;
          return [];
        }
      })
    ).subscribe({
      next: (results) => {
        this.suggestions = results;
        this.showSuggestions = results.length > 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching players:', error);
        this.suggestions = [];
        this.showSuggestions = false;
        this.isLoading = false;
      }
    });

    // Close suggestions when clicking outside (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.search-container')) {
          this.hideSuggestions();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      const playerName = this.searchQuery.trim();
      this.hideSuggestions();
      this.router.navigate(['/player', playerName]);
    }
  }

  selectPlayer(playerName: string): void {
    this.searchQuery = playerName;
    this.hideSuggestions();
    this.router.navigate(['/player', playerName]);
  }

  hideSuggestions(): void {
    this.showSuggestions = false;
    this.suggestions = [];
  }
}
