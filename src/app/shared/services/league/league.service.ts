import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { DateRandomService } from '../common/date-random.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseService<LeagueModel> {

  private apiRoot: string;

  constructor(
    _storageService: StorageService,
    private readonly _dateRandomService: DateRandomService
  ) {
    const key = 'league';
    super(key, _storageService);
    this.apiRoot = key;
  }

  addLeagueRandom(index: number): LeagueModel {
    return {
      team: 'Equipo ' + index,
      lastDate: this._dateRandomService.randomDate(new Date(2024, 0, 1), new Date()),
      goalsFor: Math.floor(Math.random() * 10),
      goalsAgainst: Math.floor(Math.random() * 10),
      points: Math.floor(Math.random() * 20)
    }
  }
}