import { BaseModel } from "../base/base.interface";
import { TeamModel } from "../team/team.interface";

export interface LeagueModel extends BaseModel {
    team: TeamModel;
    lastDate: Date;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}