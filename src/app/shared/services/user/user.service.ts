import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UserModel } from '../../models/dbo/user/user.model';

const KEY_ENDPOINT: string = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly _storageService: StorageService
  ) { }

  getAll(): UserModel[] | null {
    const data = this._storageService.getItem(KEY_ENDPOINT);
    if (!data) return null;
    return data;
  }

  create(user: UserModel) {
    const data = this.getAll();
    if (!data) {
      this._storageService.setItem(KEY_ENDPOINT, [user]);
      return;
    }
    data.push(user);
    this._storageService.setItem(KEY_ENDPOINT, data);
  }

  getByUsername(username: string): UserModel | null {
    const data = this.getAll();
    if (!data) return null;
    const user = data.find(user => user.username === username);
    return user ? user : null;
  }

}
