import { Injectable } from '@angular/core';
import { TeamService } from '../team/team.service';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { MatchModel } from '../../models/dbo/match/match.interface';
import { MatchService } from './match.service';

@Injectable({
  providedIn: 'root'
})
export class MatchInitService {

  constructor(
    private readonly _teamService: TeamService,
    private readonly _matchService: MatchService,
  ) { }

  addMatchRandom(index: number): MatchModel | null {
    const date = moment(+new Date());
    const teams = this._teamService.getAll();
    if (!teams) return null;

    const match: MatchModel = {
      id: uuidv4(),
      matchDate: +new Date(date.format('L')),
      matchData: [
        {
          localTeam: teams[0],
          visitorTeam: teams[1],
          localGoals: `${Math.floor(Math.random() * 5)}`,
          visitorGoals: `${Math.floor(Math.random() * 5)}`,
          status: 'finished'
        }
      ]
    };
    return match;
  }

  createDataMatches(): boolean {
    const data = this._matchService.getAll();
    if (!data || data.length === 0) {
      const matches = [];
      for (let index = 1; index <= 1; index++) {
        const addMatchRandom = this.addMatchRandom(index);
        if (addMatchRandom) matches.push(addMatchRandom);
      }
      this._matchService.bulkCreate(matches);
      return true;
    } else {
      return false;
    }
  }

}
