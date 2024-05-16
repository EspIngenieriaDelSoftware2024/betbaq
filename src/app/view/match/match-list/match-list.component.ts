import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatchCreateDialogComponent } from '../../../shared/components/match-create-dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { MatchModel } from '../../../shared/models/dbo/match/match.interface';
import { MatchService } from '../../../shared/services/match/match.service';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DialogModule
  ],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss',
})
export class MatchListComponent implements OnInit {

  matches!: MatchModel[];

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches() {
    const data = this._matchService.getAll();
    if (data) {
      this.matches = data;
    }
  }

  openDialog() {
    const dialogRef = this._matDialog.open(MatchCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getMatches();
    });
  }

}
