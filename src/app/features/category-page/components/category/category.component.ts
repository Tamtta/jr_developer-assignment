import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';

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
    private changeDet: ChangeDetectorRef
  ) {}

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
