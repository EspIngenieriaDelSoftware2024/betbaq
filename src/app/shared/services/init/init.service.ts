import { Injectable } from '@angular/core';
import { RegisterService } from '../auth/register.service';
import { LeagueService } from '../league/league.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _registerService: RegisterService,
    private readonly _leagueService: LeagueService
  ) { }

  initData(): void {
    this.createUserAdmin();
    this.createDataLeagues();
  }

  createUserAdmin() {
    this._registerService.registerUser({
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'Admin',
      termsAccepted: true
    });
  }

  createDataLeagues() {
    const leagues = [];
    for (let index = 1; index <= 50; index++) {
      const addLeagueRandom = this._leagueService.addLeagueRandom(index);
      leagues.push(addLeagueRandom);
    }
    this._leagueService.bulkCreate(leagues);
  }

}
