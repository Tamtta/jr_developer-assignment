import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  // constructor(
  //   public dialog: MatDialogRef<EditUserComponent>,
  //   @Inject(MAT_DIALOG_DATA) public item: IUser
  // ) {}

  ngOnInit(): void {}

  onSubmitted(update: IUser) {
    // this.dialog.close(update);
  }
}
