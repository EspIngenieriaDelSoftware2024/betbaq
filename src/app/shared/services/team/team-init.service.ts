import { Injectable } from '@angular/core';
import { TeamModel } from '../../models/dbo/team/team.interface';
import { v4 as uuidv4 } from 'uuid';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class TeamInitService {

  constructor(
    private readonly _teamService: TeamService
  ) { }

  addTeamRandom(index: number): TeamModel {
    return {
      id: uuidv4(),
      teamName: 'Equipo ' + index
    }
  }

  createDataTeams(): boolean {
    const data = this._teamService.getAll();
    if (!data || data.length === 0) {
      const teams = [];
      for (let index = 1; index <= 2; index++) {
        const addTeamRandom = this.addTeamRandom(index);
        teams.push(addTeamRandom);
      }
      this._teamService.bulkCreate(teams);
      return true;
    } else {
      return false;
    }
  }

}
