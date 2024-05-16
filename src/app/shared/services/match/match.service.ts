import { Injectable } from '@angular/core';
import { MatchModel } from '../../models/dbo/match/match.interface';
import { BaseService } from '../base/base.service';
import { StorageService } from '../storage/storage.service';

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

  addMatchRandom(index: number): MatchModel {
    const match: MatchModel = {
      matchDate: +new Date(),
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
