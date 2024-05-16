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

  getAll(): UserModel[] {
    const data = this._storageService.getItem(KEY_ENDPOINT);
    if (!data) return [];
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

  getByUsername(username: string): UserModel | undefined {
    const data = this.getAll();
    if (!data) {
      return undefined;
    }
    return data.find((user: UserModel) => user.username == username);
  }

}
