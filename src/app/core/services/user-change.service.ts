import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserChangeService {
  private _userChange = new Subject<number>();
  private _userChange$ = this._userChange.asObservable();
  constructor() {}

  next(id: number) {
    this._userChange.next(id);
  }

  get userChange() {
    return this._userChange$;
  }
}
