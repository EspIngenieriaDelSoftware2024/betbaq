import { BaseModel } from "../base/base.interface";
import { TeamModel } from "../team/team.interface";

export interface LeagueModel extends BaseModel {
    team: TeamModel;
    lastDate: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}