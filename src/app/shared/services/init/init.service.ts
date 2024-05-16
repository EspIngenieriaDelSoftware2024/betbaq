import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _authService: AuthService
  ) { }

  initData(): void {
    this._authService.registerUser({
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'Admin',
      termsAccepted: true
    });
  }

}
