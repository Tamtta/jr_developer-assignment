import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { IUser, Update } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryList = [
    'All',
    'VIP',
    'Idle',
    'Tester',
    'Developer',
    'Accountant',
    'Admin',
  ];
  users: IUser[] = [];
  filtered: IUser[] = [];

  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes = [5, 10, 15, 20];

  constructor(
    private usersService: UsersService,
    private changeDet: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  @Output() user!: IUser;
  @Output() udpateEvent: EventEmitter<Update> = new EventEmitter<Update>();

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAll().subscribe((users) => {
      this.users = users;
      this.changeDet.markForCheck();
      // console.log(users);
    });
  }

  onCategoryChange(value: string) {
    if (this.users.length === 0 || value.toLowerCase() === 'all') {
      return (this.filtered = this.users);
    } else {
      return (this.filtered = this.users.filter((user) => {
        return user.category.toLowerCase() === value.toLowerCase();
      }));
    }
  }

  editUser(id: number) {
    this.usersService.getById(id.toString()).subscribe((user) => {
      this.user = user;
      console.log(user);
      this.dialog.open(ModalComponent, {
        width: '80rem',
        height: '150rem',
        data: user,
      });
    });
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '80rem',
      height: '150rem',
    });
  }

  delete(id: number) {
    this.usersService
      .delete(id.toString())
      .pipe(catchError(() => EMPTY))
      .subscribe((t) => this.loadUsers());
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
