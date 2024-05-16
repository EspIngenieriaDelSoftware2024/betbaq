import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'team-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './team-create-dialog.component.html',
  styleUrl: './team-create-dialog.component.scss',
})
export class TeamCreateDialogComponent {

  teamForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.teamForm = this._formBuilder.group({
      teamName: ['', Validators.required],
      points: ['', Validators.required],
      playedMatches: ['', Validators.required],
      wonMatches: ['', Validators.required],
      drawnMatches: ['', Validators.required],
      lostMatches: ['', Validators.required],
      goalsFor: ['', Validators.required],
      goalsAgainst: ['', Validators.required]
    });
  }

  getError(controlName: string, error: string): boolean {
    return this.teamForm.controls[controlName].hasError(error);
  }

  cancel(): void {
    this.teamForm.reset();
  }

  save() {
    console.log(this.teamForm.value);
  }

}
