import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'league-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './league-table.component.html',
  styleUrl: './league-table.component.scss',
})
export class LeagueTableComponent implements OnInit {

  displayedColumns: string[] = ['team', 'lastDate', 'goalsFor', 'goalsAgainst', 'points', 'details'];
  leagueData: LeagueModel[] = [
    { team: 'Equipo 1', lastDate: '2021-10-01', goalsFor: 10, goalsAgainst: 5, points: 15 },
    { team: 'Equipo 2', lastDate: '2021-10-01', goalsFor: 8, goalsAgainst: 7, points: 13 },
    { team: 'Equipo 3', lastDate: '2021-10-01', goalsFor: 6, goalsAgainst: 9, points: 9 },
    { team: 'Equipo 4', lastDate: '2021-10-01', goalsFor: 4, goalsAgainst: 12, points: 7 },
    { team: 'Equipo 5', lastDate: '2021-10-01', goalsFor: 2, goalsAgainst: 15, points: 3 }
  ];

  ngOnInit(): void { }

  showDetails(row: any) {
    console.log('Details:', row);
  }

}
