import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UserModel } from '../../models/dbo/user/user.model';
import { BaseService } from '../base/base.service';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

  private apiRoot: string;

  constructor(
    _storageService: StorageService
  ) {
    const key = 'users';
    super(key, _storageService);
    this.apiRoot = key;
  }

  getByUsername(username: string): UserModel | null {
    const data = this.getAll();
    if (!data) return null;
    const user = data.find(user => user.username === username);
    return user ? user : null;
  }
}
