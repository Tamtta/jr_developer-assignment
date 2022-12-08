import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
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

  @Input() name: string = '';
  @Input() surname: string = '';
  @Input() mail: string = '';
  @Input() birthday: string = '';
  @Input() persNumber: string = '';
  @Input() status: string = '';
  @Input() category: string = '';

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  ngOnInit(): void {
    console.log('Modal init');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() {
    this.confirmEvent.emit();
  }

  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }
}
