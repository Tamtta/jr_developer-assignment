import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];

  constructor(
    private usersService: UsersService,
    private changeDet: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAll().subscribe((users) => {
      this.users = users;
      this.changeDet.markForCheck();
    });
  }

  delete(id: number) {
    this.usersService
      .delete(id.toString())
      .pipe(catchError(() => EMPTY))
      .subscribe((t) => this.loadUsers());
  }
}
