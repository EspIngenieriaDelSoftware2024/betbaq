import { Injectable } from '@angular/core';
import { UserModel } from '../../models/dbo/user/user.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly _storageService: StorageService
  ) { }


  setSession(user: UserModel) {
    this._storageService.setItem('user', user);
  }

  getSession() {
    this._storageService.getItem('user');
  }

}