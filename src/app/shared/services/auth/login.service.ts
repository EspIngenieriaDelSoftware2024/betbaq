import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { CredentialsModel } from '../../models/dto/login/credentials.model';
import { UserModel } from '../../models/dbo/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly _userService: UserService
  ) { }

  login(login: CredentialsModel): UserModel | null {
    const user = this._userService.getByUsername(login.username);
    if (user && user.password === login.password) {
      return user;
    } else {
      return null;
    }
  }

}
