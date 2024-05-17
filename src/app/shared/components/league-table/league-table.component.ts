import { CommonModule } from '@angular/common';
import { Component, ViewChild, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { LeagueService } from '../../services/league/league.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'league-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './league-table.component.html',
  styleUrl: './league-table.component.scss',
})
export class LeagueTableComponent {

  dataSource!: MatTableDataSource<LeagueModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions: number[] = [5, 10, 25];
  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['team', 'lastDate', 'goalsFor', 'goalsAgainst', 'points', 'details'];
  totalItems: number = 0;

  constructor(
    private readonly _leagueService: LeagueService
  ) {
  }

  ngOnInit(): void {
    this.getPaginatedData();
  }

  showDetails(row: any) {
    console.log('Details:', row);
  }

  getPaginatedData() {
    const leagueData = this._leagueService.getAll();
    if (leagueData) {
      this.totalItems = leagueData.length
      this.dataSource = new MatTableDataSource(leagueData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event, columnEvent: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: LeagueModel, column: string) => {
      if (columnEvent === 'team') {
        return data.team.teamName.toString().toLowerCase().includes(filterValue);
      } else if (columnEvent === 'goalsFor') {
        return data.goalsFor.toString().toLowerCase().includes(filterValue);
      } else if (columnEvent === 'goalsAgainst') {
        return data.goalsAgainst.toString().toLowerCase().includes(filterValue);
      } else if (columnEvent === 'points') {
        return data.points.toString().toLowerCase().includes(filterValue);
      } else if (columnEvent === 'lastDate') {
        return data.lastDate.toString().toLowerCase().includes(filterValue);
      } else {
        return true;
      }

     
    };
  }

}
