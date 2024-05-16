import { Injectable } from '@angular/core';
import { MatchModel } from '../../models/dbo/match/match.interface';
import { BaseService } from '../base/base.service';
import { StorageService } from '../storage/storage.service';
import moment from 'moment';
import { TeamService } from '../team/team.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService<MatchModel> {

  private apiRoot: string;

  constructor(
    _storageService: StorageService,
    private readonly _teamService: TeamService,
  ) {
    const key = 'matchs';
    super(key, _storageService);
    this.apiRoot = key;
  }

  createOrUpdate(match: MatchModel): void {
    const findData = this.getByMatchDate(match.matchDate);
    if (!findData) {
      match.id = uuidv4();
      this.create(match);
      return;
    }
    findData.matches[findData.index].matchData.push(...match.matchData);
    this.bulkCreate(findData.matches);
  }

  getByMatchDate(matchDate: number): { matches: MatchModel[], index: number } | null {
    const data = this.getAll();
    if (!data) return null;
    const index = data.findIndex(match => match.matchDate === matchDate);
    if (index === -1) return null;
    return { matches: data, index };
  }

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

}
