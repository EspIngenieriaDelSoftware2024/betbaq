import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserModel } from '../../models/dbo/user/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserInitService {

  constructor(
    private readonly _userService: UserService
  ) { }

  addUserAdmin(): UserModel {
    const user: UserModel = {
      id: uuidv4(),
      username: 'admin',
      password: 'admin',
      firstName: 'Admin',
      lastName: 'Admin',
      termsAccepted: true
    };
    return user;
  }

  createUserAdmin() {
    const data = this._userService.getAll();
    if (!data) {
      this._userService.create(this.addUserAdmin());
    }
  }

}
