import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRandomService {

  constructor() { }

  start = new Date(2001, 0, 1)
  end = new Date()

  randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

}
