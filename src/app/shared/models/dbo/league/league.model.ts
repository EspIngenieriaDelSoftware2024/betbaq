import { BaseModel } from "../base/base.interface";

export interface LeagueModel extends BaseModel {
    team: string;
    lastDate: Date;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
}