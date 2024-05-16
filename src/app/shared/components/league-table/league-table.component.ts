import { CommonModule } from '@angular/common';
import { Component, ViewChild, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LeagueModel } from '../../models/dbo/league/league.model';
import { LeagueService } from '../../services/league/league.service';

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
  ],
  templateUrl: './league-table.component.html',
  styleUrl: './league-table.component.scss',
})
export class LeagueTableComponent implements OnInit {

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
    this.getPaginatedData();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  showDetails(row: any) {
    console.log('Details:', row);
  }

  getPaginatedData() {
    const leagueData = this._leagueService.getAll();
    if (leagueData) {
      this.totalItems = leagueData.length
      this.dataSource = new MatTableDataSource(leagueData);
    }
  }

}
