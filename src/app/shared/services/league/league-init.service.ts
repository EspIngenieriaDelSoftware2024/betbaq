import { Injectable } from '@angular/core';
import { DateRandomService } from '../common/date-random.service';
import { TeamService } from '../team/team.service';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { v4 as uuidv4 } from 'uuid';
import { LeagueService } from './league.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueInitService {

  constructor(
    private readonly _dateRandomService: DateRandomService,
    private readonly _teamService: TeamService,
    private readonly _leagueService: LeagueService
  ) { }

  addLeagueRandom(): LeagueModel | null {
    const teams = this._teamService.getAll();
    if (!teams) return null;

    return {
      id: uuidv4(),
      team: teams[0],
      lastDate: this._dateRandomService.randomDate(new Date(2024, 0, 1), new Date()),
      goalsFor: Math.floor(Math.random() * 10),
      goalsAgainst: Math.floor(Math.random() * 10),
      points: Math.floor(Math.random() * 20)
    }
  }

  createDataLeagues() {
    const data = this._leagueService.getAll();
    if (!data || data.length === 0) {
      const leagues: LeagueModel[] = [];
      for (let index = 1; index <= 1; index++) {
        const addLeagueRandom = this.addLeagueRandom();
        if (addLeagueRandom) leagues.push(addLeagueRandom);
      }
      if (leagues && leagues.length > 0) this._leagueService.bulkCreate(leagues);
    }
  }

}
