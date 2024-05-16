import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { DateRandomService } from '../common/date-random.service';

const KEY_ENDPOINT: string = 'teams';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {


  constructor(
    private readonly _storageService: StorageService,
    private readonly _dateRandomService: DateRandomService
  ) { }

  getAll(): LeagueModel[] | null {
    const data = this._storageService.getItem(KEY_ENDPOINT);
    if (!data) return null;
    return data;
  }

  create(league: LeagueModel) {
    const data = this.getAll();
    if (!data) {
      this._storageService.setItem(KEY_ENDPOINT, [league]);
      return;
    }
    data.push(league);
    this._storageService.setItem(KEY_ENDPOINT, data);
  }

  bulkCreate(leagues: LeagueModel[]) {
    this._storageService.setItem(KEY_ENDPOINT, leagues);
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
