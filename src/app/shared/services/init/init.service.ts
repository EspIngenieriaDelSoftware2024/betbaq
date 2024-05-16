import { Injectable } from '@angular/core';
import { LeagueService } from '../league/league.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _userService: UserService,
    private readonly _leagueService: LeagueService
  ) { }

  initData(): void {
    this.createUserAdmin();
    this.createDataLeagues();
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
      for (let index = 1; index <= 50; index++) {
        const addLeagueRandom = this._leagueService.addLeagueRandom(index);
        leagues.push(addLeagueRandom);
      }
      this._leagueService.bulkCreate(leagues);
    }
  }

}
