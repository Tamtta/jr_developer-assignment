import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  // id!: number;
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes = [5, 10, 15, 20];

  filterText: string = '';

  constructor(
    private usersService: UsersService,
    private changeDet: ChangeDetectorRef,
    private router: Router
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

  edit(id: number) {
    this.router.navigateByUrl(`/list/${id}`);
    // this.id = id;
    localStorage.setItem('id', JSON.stringify(id));
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.loadUsers();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadUsers();
  }
}
