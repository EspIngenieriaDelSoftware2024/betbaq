import { Injectable } from '@angular/core';
import { UserModel } from '../../models/dbo/user/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private readonly _userService: UserService
  ) { }

  registerUser(user: UserModel) {
    const findUsername = this._userService.getByUsername(user.username);
    if (!findUsername) {
      this._userService.create(user);
    }
  }

}
