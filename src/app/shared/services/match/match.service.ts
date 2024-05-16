import { Injectable } from '@angular/core';
import { MatchModel } from '../../models/dbo/match/match.interface';
import { BaseService } from '../base/base.service';
import { StorageService } from '../storage/storage.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MatchService extends BaseService<MatchModel> {

  private apiRoot: string;

  constructor(
    _storageService: StorageService
  ) {
    const key = 'matchs';
    super(key, _storageService);
    this.apiRoot = key;
  }

  createOrUpdate(match: MatchModel): void {
    const findData = this.getByMatchDate(match.matchDate);
    if (!findData) {
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

  addMatchRandom(index: number): MatchModel {
    const date = moment(+new Date());

    const match: MatchModel = {
      matchDate: +new Date(date.format('L')),
      matchData: [
        {
          localTeam: {
            teamName: `Team A`,
          },
          visitorTeam: {
            teamName: `Team B`,
          },
          localGoals: `${Math.floor(Math.random() * 5)}`,
          visitorGoals: `${Math.floor(Math.random() * 5)}`,
          status: 'finished'
        }
      ]
    };
    return match;
  }

}
