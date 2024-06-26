import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../../shared/models/dbo/user/user.model';
import { RegisterService } from '../../../shared/services/auth/register.service';
import { MatIconModule } from '@angular/material/icon';

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
    RouterLink,
    MatIconModule
  ],
  templateUrl: './register-create.component.html',
  styleUrl: './register-create.component.scss',
})
export class RegisterCreateComponent {

  public registrationForm!: FormGroup;
  public nameApp: string = '@betbaq';

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _registerService: RegisterService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router
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
      this._snackBar.open('Usuario registrado', 'Cerrar', {
        duration: 2000,
      });
      this._router.navigate(['/login']);
    }
  }

  getError(controlName: string, error: string): boolean {
    return this.registrationForm.controls[controlName].hasError(error);
  }

}
