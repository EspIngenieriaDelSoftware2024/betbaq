import { Injectable } from '@angular/core';
import { MatchModel } from '../../models/dbo/match/match.interface';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { LeagueService } from './league.service';
import { MatchService } from '../match/match.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CalculateLeagueService {

  constructor(
    private readonly _leagueService: LeagueService,
    private readonly _matchService: MatchService
  ) { }

  calculateLeagueTable(matches: MatchModel[]): LeagueModel[] {
    const leagueTable: LeagueModel[] = [];

    for (const match of matches) {
      const { matchData } = match;

      for (const matchDataItem of matchData) {
        const { localTeam, visitorTeam, localGoals, visitorGoals } = matchDataItem;

        // Update goalsFor and goalsAgainst for local team
        let localTeamIndex = this.getIndexByTeamId(leagueTable, localTeam.id);
        if (localTeamIndex !== -1) {
          leagueTable[localTeamIndex].goalsFor += parseInt(localGoals, 10);
          leagueTable[localTeamIndex].goalsAgainst += parseInt(visitorGoals, 10);
        } else {
          leagueTable.push({
            id: uuidv4(),
            team: localTeam,
            lastDate: match.matchDate,
            goalsFor: parseInt(localGoals, 10),
            goalsAgainst: parseInt(visitorGoals, 10),
            points: 0
          });
          localTeamIndex = this.getIndexByTeamId(leagueTable, localTeam.id);
        }

        // Update goalsFor and goalsAgainst for visitor team
        let visitorTeamIndex = this.getIndexByTeamId(leagueTable, visitorTeam.id);
        if (visitorTeamIndex !== -1) {
          leagueTable[visitorTeamIndex].goalsFor += parseInt(visitorGoals, 10);
          leagueTable[visitorTeamIndex].goalsAgainst += parseInt(localGoals, 10);
        } else {
          leagueTable.push({
            id: uuidv4(),
            team: visitorTeam,
            lastDate: match.matchDate,
            goalsFor: parseInt(visitorGoals, 10),
            goalsAgainst: parseInt(localGoals, 10),
            points: 0
          });
          visitorTeamIndex = this.getIndexByTeamId(leagueTable, visitorTeam.id);
        }

        // Update points for local and visitor team based on match result
        const localGoalsInt = parseInt(localGoals, 10);
        const visitorGoalsInt = parseInt(visitorGoals, 10);
        if (localGoalsInt > visitorGoalsInt) {
          leagueTable[localTeamIndex].points += 3; // Local team won
        } else if (localGoalsInt < visitorGoalsInt) {
          leagueTable[visitorTeamIndex].points += 3; // Visitor team won
        } else {
          leagueTable[localTeamIndex].points += 1; // Draw
          leagueTable[visitorTeamIndex].points += 1; // Draw
        }
      }
    }

    return leagueTable;
  }

  getIndexByTeamId(leagueTable: LeagueModel[], teamId: string): number {
    return leagueTable.findIndex(item => item.team.id === teamId);
  }

  updateLeagueByMatch() {
    const matches = this._matchService.getAll();
    if (!matches) return;
    const league = this.calculateLeagueTable(matches)
    if (league) {
      this.sortLeagueTable(league);
      this._leagueService.bulkCreate(league);
    }
  }

  sortLeagueTable(leagueTable: LeagueModel[]): LeagueModel[] {
    if (!leagueTable) return [];
    return leagueTable.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points; // Sort by points in descending order
      } else {
        const aGoalDifference = a.goalsFor - a.goalsAgainst;
        const bGoalDifference = b.goalsFor - b.goalsAgainst;
        if (aGoalDifference !== bGoalDifference) {
          return bGoalDifference - aGoalDifference; // Sort by goal difference in descending order
        } else {
          return b.goalsFor - a.goalsFor;
        }
      }
    });
  }
}