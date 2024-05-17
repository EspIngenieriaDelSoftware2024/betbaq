import { Injectable } from '@angular/core';
import { UserModel } from '../../models/dbo/user/user.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key_sesion: string = 'sesion';

  constructor(
    private readonly _storageService: StorageService
  ) { }


  setSession(user: UserModel): void {
    this._storageService.setItem(this.key_sesion, user);
  }

  getSession(): UserModel {
    return this._storageService.getItem(this.key_sesion);
  }

  removeSession(): void {
    this._storageService.removeItem(this.key_sesion);
  }

}
