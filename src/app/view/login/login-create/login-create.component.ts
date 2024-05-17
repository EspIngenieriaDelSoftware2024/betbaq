import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CredentialsModel } from '../../../shared/models/dto/login/credentials.model';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { LoginService } from '../../../shared/services/auth/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-create',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-create.component.html',
  styleUrl: './login-create.component.scss',
})
export class LoginCreateComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _loginService: LoginService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.getRawValue() as CredentialsModel;
      const user = this._loginService.login(credentials);
      if (user) {
        this._authService.setSession(user);
        this._router.navigateByUrl('/home/dashboard');
        this._snackBar.open(`Hola! ${user.firstName} 😊`, 'Cerrar', {
          duration: 2000,
        });
      }
    }
  }

  getError(controlName: string, error: string): boolean {
    return this.loginForm.controls[controlName].hasError(error);
  }

}
