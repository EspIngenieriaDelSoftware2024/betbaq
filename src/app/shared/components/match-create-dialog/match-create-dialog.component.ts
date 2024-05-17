import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TeamModel } from '../../models/dbo/team/team.interface';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatchModel } from '../../models/dbo/match/match.interface';
import { MatchService } from '../../services/match/match.service';
import moment from 'moment';
import { DialogRef } from '@angular/cdk/dialog';
import { TeamService } from '../../services/team/team.service';
import { CalculateLeagueService } from '../../services/league/calculate-league.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'match-create-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './match-create-dialog.component.html',
  styleUrl: './match-create-dialog.component.scss',
})
export class MatchCreateDialogComponent implements OnInit {

  matchForm!: FormGroup;
  teams!: TeamModel[];

  constructor(
    private readonly _calculateLeagueService: CalculateLeagueService,
    private readonly _formBuilder: FormBuilder,
    private readonly _matchService: MatchService,
    private readonly _teamService: TeamService,
    public _dialogRef: DialogRef<MatchCreateDialogComponent>,
    private readonly _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getTeams();
  }

  buildForm(): void {
    this.matchForm = this._formBuilder.group({
      matchDate: [new Date(), Validators.required],
      localTeam: ['', Validators.required],
      visitorTeam: ['', Validators.required],
      localGoals: ['', Validators.required],
      visitorGoals: ['', Validators.required]
    });
  }

  getError(controlName: string, error: string): boolean {
    return this.matchForm.controls[controlName].hasError(error);
  }

  getTeams(): void {
    const data = this._teamService.getAll();
    if (data) this.teams = data;
  }

  save() {
    if (this.matchForm.valid) {
      const date = moment(this.matchForm.value.matchDate.getTime());
      const match: MatchModel = {
        id: '',
        matchDate: +new Date(date.format('L')),
        matchData: [
          {
            localTeam: this.matchForm.value.localTeam,
            visitorTeam: this.matchForm.value.visitorTeam,
            localGoals: this.matchForm.value.localGoals,
            visitorGoals: this.matchForm.value.visitorGoals,
            status: 'finished'
          }
        ]
      };
      this._matchService.createOrUpdate(match);
      this._calculateLeagueService.updateLeagueByMatch();
      this._snackBar.open('Partido registrado ⚽', 'Cerrar', {
        duration: 2000,
      });
      this._dialogRef.close();
    }
  }

}
