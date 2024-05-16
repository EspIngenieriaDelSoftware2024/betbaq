import { Injectable } from '@angular/core';
import { UserModel } from '../../models/dbo/user/user.model';
import { UserService } from '../user/user.service';
import { v4 as uuidv4 } from 'uuid';

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
      user.id = uuidv4(),
        this._userService.create(user);
    }
  }

}
