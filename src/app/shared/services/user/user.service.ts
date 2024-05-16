import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UserModel } from '../../models/dbo/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly _storageService: StorageService
  ) { }

  getAll(): UserModel[] {
    return this._storageService.getItem('users');
  }

  create(user: UserModel) {
    const users = this.getAll();
    if (!users) {
      this._storageService.setItem('users', [user]);
      return;
    }
    users.push(user);
    this._storageService.setItem('users', users);
  }

  getByUsername(username: string): UserModel | undefined {
    const users = this.getAll();
    if (!users) {
      return undefined;
    }
    return users.find((user: UserModel) => user.username == username);
  }

}
