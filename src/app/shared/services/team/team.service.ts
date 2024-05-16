import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { TeamModel } from '../../models/dbo/team/team.interface';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<TeamModel> {
  private apiRoot: string;

  constructor(
    _storageService: StorageService
  ) {
    const key = 'teams';
    super(key, _storageService);
    this.apiRoot = key;
  }

  addTeamRandom(index: number): TeamModel {
    return {
      id: uuidv4(),
      teamName: 'Equipo ' + index
    }
  }
}
