import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IUser, Update } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalComponent } from '../modal/modal.component';

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
  user!: IUser;

  private dialogRef: any;

  @Input() items!: IUser[];
  @Output() delete: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() udpateEvent: EventEmitter<Update> = new EventEmitter<Update>();

  constructor(
    private usersService: UsersService,
    private changeDet: ChangeDetectorRef,
    public dialog: MatDialog
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

  editUser(user: IUser) {
    const dialog = this.dialog.open(ModalComponent, {
      width: '700px',
      height: '400px',
      data: user,
    });
    this.dialogRef.updatePosition({ top: '3%', left: '20%' });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.udpateEvent.emit({
          old: user,
          new: res,
        });
      }
    });
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

  // this.usersService.getById(id.toString()).subscribe((user) => {
  //   this.user = user;
  //   this.changeDet.markForCheck();
  // }),
}
