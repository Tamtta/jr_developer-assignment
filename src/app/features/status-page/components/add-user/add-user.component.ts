import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first, catchError, EMPTY } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUser!: FormGroup;
  constructor(
    private usersService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    public dialogWindow: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {
    this.addUser = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      persNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  onSubmitAddUser() {
    this.usersService
      .add(this.addUser.value)
      .pipe(
        first(),
        catchError(() => EMPTY)
      )
      .subscribe((res) => {
        console.log(res);
        this.addUser.reset();
        this.router.navigateByUrl('/status');
        this.dialog.closeAll();
      });
  }

  cancel() {
    this.router.navigateByUrl('/status');
    this.dialog.closeAll();
  }
}
