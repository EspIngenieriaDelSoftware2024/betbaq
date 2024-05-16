import { Injectable } from '@angular/core';
import { UserModel } from '../../models/dbo/user/user.model';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _registerService: RegisterService
  ) { }

  registerUser(user: UserModel) {
    this._registerService.registerUser(user);
  }
}
