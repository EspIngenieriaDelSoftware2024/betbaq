import { TeamModel } from "../team/team.interface";

export interface MatchModel {
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