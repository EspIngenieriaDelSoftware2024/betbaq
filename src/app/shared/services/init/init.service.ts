import { Injectable } from '@angular/core';
import { LeagueService } from '../league/league.service';
import { UserService } from '../user/user.service';
import { MatchService } from '../match/match.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _userService: UserService,
    private readonly _leagueService: LeagueService,
    private readonly _matchService: MatchService
  ) { }

  initData(): void {
    this.createUserAdmin();
    this.createDataLeagues();
    this.createDataMatches();
  }

  createUserAdmin() {
    const data = this._userService.getAll();
    if (!data) {
      this._userService.create({
        username: 'admin',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        termsAccepted: true
      });
    }
  }

  createDataLeagues() {
    const data = this._leagueService.getAll();
    if (!data || data.length === 0) {
      const leagues = [];
      for (let index = 1; index <= 15; index++) {
        const addLeagueRandom = this._leagueService.addLeagueRandom(index);
        leagues.push(addLeagueRandom);
      }
      this._leagueService.bulkCreate(leagues);
    }
  }

  createDataMatches() {
    const data = this._matchService.getAll();
    if (!data || data.length === 0) {
      const matches = [];
      for (let index = 1; index <= 1; index++) {
        const addMatchRandom = this._matchService.addMatchRandom(index);
        matches.push(addMatchRandom);
      }
      this._matchService.bulkCreate(matches);
    }
  }

}
