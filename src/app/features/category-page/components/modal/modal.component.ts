import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/core/interfaces/IUser.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: IUser
  ) {}

  ngOnInit(): void {
    console.log('Modal init');
  }

  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }
}
