import { Injectable } from '@angular/core';
import { CalculateLeagueService } from '../league/calculate-league.service';
import { MatchInitService } from '../match/match-init.service';
import { TeamInitService } from '../team/team-init.service';
import { UserInitService } from '../user/user-init.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _userInitService: UserInitService,
    private readonly _matchInitService: MatchInitService,
    private readonly _teamInitService: TeamInitService,
    private readonly _calculateLeagueService: CalculateLeagueService
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
    if (hasCreate) this._calculateLeagueService.updateLeagueByMatch();
  }
}
