import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule
  ],
  templateUrl: './register-create.component.html',
  styleUrl: './register-create.component.scss',
})
export class RegisterCreateComponent {

  public registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      this.authService.registerUser(user);
    }
  }

  getError(controlName: string, error: string): boolean {
    return this.registrationForm.controls[controlName].hasError(error);
  }

}
