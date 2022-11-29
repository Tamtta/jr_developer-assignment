import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private mainUrl = 'http://localhost:3000/';
  private userSubject: BehaviorSubject<IUser>;
  public user: Observable<IUser>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<IUser>({} as IUser);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  add(user: IUser) {
    return this.http.post(`${this.mainUrl}users`, user);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.mainUrl}users`);
  }

  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.mainUrl}users/${id}`);
  }

  update(id: string, params: IUser) {
    return this.http.put(`${this.mainUrl}users/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${this.mainUrl}users/${id}`);
  }
}
