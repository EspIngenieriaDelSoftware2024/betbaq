import { Injectable } from '@angular/core';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { BaseService } from '../base/base.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends BaseService<LeagueModel> {

  private apiRoot: string;

  constructor(
    _storageService: StorageService,
  ) {
    const key = 'league';
    super(key, _storageService);
    this.apiRoot = key;
  }

}