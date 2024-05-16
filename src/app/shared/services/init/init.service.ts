import { Injectable } from '@angular/core';
import { LeagueInitService } from '../league/league-init.service';
import { MatchInitService } from '../match/match-init.service';
import { TeamInitService } from '../team/team-init.service';
import { UserService } from '../user/user.service';
import { UserInitService } from '../user/user-init.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _userInitService: UserInitService,
    private readonly _leagueInitService: LeagueInitService,
    private readonly _matchInitService: MatchInitService,
    private readonly _teamInitService: TeamInitService
  ) { }

  initData(): void {
    this.createUserAdmin();
    this.createDataTeams();
  }

  createUserAdmin() {
    this._userInitService.createUserAdmin();
  }

  createDataTeams() {
    const hasCreate = this._teamInitService.createDataTeams();
    if (hasCreate) this.createDataMatches();
  }

  createDataMatches() {
    const hasCreate = this._matchInitService.createDataMatches();
    if (hasCreate) this._leagueInitService.createDataLeagues();
  }
}
