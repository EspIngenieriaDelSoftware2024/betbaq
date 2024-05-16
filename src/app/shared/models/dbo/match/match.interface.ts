import { BaseModel } from "../base/base.interface";
import { TeamModel } from "../team/team.interface";

export interface MatchModel extends BaseModel {
    matchDate: number;
    matchData: MatchData[];
}

export interface MatchData {
    localTeam: TeamModel;
    visitorTeam: TeamModel;
    localGoals: string;
    visitorGoals: string;
    status: string;
}