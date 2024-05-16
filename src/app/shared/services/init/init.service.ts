import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RegisterService } from '../auth/register.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private readonly _registerService: RegisterService
  ) { }

  initData(): void {
    this._registerService.registerUser({
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'Admin',
      termsAccepted: true
    });
  }

}
