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
  teams: TeamModel[] = [
    {
      teamName: 'Team A'
    },
    {
      teamName: 'Team B'
    },
  ];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.buildForm();
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

  save() {
    if (this.matchForm.valid) {
      const match: MatchModel = {
        matchDate: this.matchForm.value.matchDate.getTime(),
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
      this._matchService.create(match);
    }
  }

}
