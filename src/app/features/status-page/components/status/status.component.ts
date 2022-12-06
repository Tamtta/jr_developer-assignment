import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  statusList = [
    'All',
    'Active',
    'Blocked',
    'Suspended',
    'Paused',
    'Deleted',
    'Debt',
    'Rejected',
  ];

  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes = [5, 10, 15, 20];

  entry!: ViewContainerRef;
  sub!: Subscription;
  users: IUser[] = [];
  filtered: IUser[] = [];

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

  onStatusChange(value: string) {
    if (this.users.length === 0 || value.toLowerCase() === 'all') {
      return (this.filtered = this.users);
    } else {
      return (this.filtered = this.users.filter((user) => {
        return user.status.toLowerCase() === value.toLowerCase();
      }));
    }
  }

  editUser(id: number) {}

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
