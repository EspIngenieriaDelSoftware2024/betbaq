import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseService<TModel> {
  protected key: string;
  protected _storageService: StorageService;

  constructor(key: string, storageService: StorageService) {
    this.key = key;
    this._storageService = storageService;
  }

  getAll(): TModel[] | null {
    const data = this._storageService.getItem(this.key);
    if (!data) return null;
    return data;
  }

  create(model: TModel) {
    const data = this.getAll();
    if (!data) {
      this._storageService.setItem(this.key, [model]);
      return;
    }
    data.push(model);
    this._storageService.setItem(this.key, data);
  }

  bulkCreate(leagues: TModel[]) {
    this._storageService.setItem(this.key, leagues);
  }

}
