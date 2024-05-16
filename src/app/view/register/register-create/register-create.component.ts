import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../../shared/services/auth/register.service';
import { UserModel } from '../../../shared/models/dbo/user/user.model';

@Component({
  selector: 'app-register-create',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './register-create.component.html',
  styleUrl: './register-create.component.scss',
})
export class RegisterCreateComponent {

  public registrationForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _registerService: RegisterService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.getRawValue() as UserModel;
      this._registerService.registerUser(user);
    }
  }

  getError(controlName: string, error: string): boolean {
    return this.registrationForm.controls[controlName].hasError(error);
  }

}
