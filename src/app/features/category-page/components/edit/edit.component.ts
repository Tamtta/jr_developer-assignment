import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { first, catchError, EMPTY } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  addUser!: FormGroup;

  new: boolean = false;

  @Input() id!: any;
  @Input() user!: IUser;
  @Input() editUserClicked!: boolean;

  constructor(
    private usersService: UsersService,
    private router: Router,
    public dialog: MatDialog
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

  onSubmitUpdateUser(id: any) {
    this.usersService
      .update(id.toString(), {
        name: this.addUser.value.name,
        surname: this.addUser.value.surname,
        persNumber: this.addUser.value.persNumber,
        mail: this.addUser.value.mail,
        birthday: this.addUser.value.birthday,
        category: this.addUser.value.category,
        status: this.addUser.value.status,
        id: this.id,
      })
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
