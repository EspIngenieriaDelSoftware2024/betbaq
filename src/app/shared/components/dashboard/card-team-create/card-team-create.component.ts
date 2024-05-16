import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TeamCreateDialogComponent } from '../../team-create-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'card-team-create',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './card-team-create.component.html',
  styleUrl: './card-team-create.component.scss',
})
export class CardTeamCreateComponent implements OnInit {

  constructor(
    public _matDialog: MatDialog
  ) { }


  ngOnInit(): void { }

  openDialog() {
    const dialogRef = this._matDialog.open(TeamCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
