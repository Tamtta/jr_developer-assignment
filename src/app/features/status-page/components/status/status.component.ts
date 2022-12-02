import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
// import { MatDialog } from '@angular/material';
// import { MatDialog } from '@angular/material';
import { IUser, Update } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

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

  @Input() items!: IUser[];
  @Output() delete: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() udpateEvent: EventEmitter<Update> = new EventEmitter<Update>();

  users: IUser[] = [];
  filtered: IUser[] = [];

  constructor(
    private usersService: UsersService,
    private changeDet: ChangeDetectorRef
  ) // public dialog: MatDialog
  {}

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

  onStatusChange(value: string) {
    if (this.users.length === 0 || value.toLowerCase() === 'all') {
      return (this.filtered = this.users);
    } else {
      return (this.filtered = this.users.filter((user) => {
        return user.status.toLowerCase() === value.toLowerCase();
      }));
    }
  }

  // onEditClicked(user: IUser) {
  // const dialog = this.dialog.open(EditUserComponent, {
  //     width: '700px',
  //     data: user,
  //   });

  //   dialog.afterClosed().subscribe((res) => {
  //     if (res) {
  //       this.udpateEvent.emit({
  //         old: user,
  //         new: res,
  //       });
  //     }
  //   });
  // }
}
