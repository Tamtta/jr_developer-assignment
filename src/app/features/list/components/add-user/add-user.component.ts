import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, first } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  // @Input() id!: number;
  addUser!: FormGroup;
  id: number = JSON.parse(localStorage.getItem('id')!);
  new: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // localStorage.removeItem('id');
    console.log(this.id);
    if (this.id == null) {
      this.new = true;
    } else {
      this.new = false;
      this.usersService
        .getById(this.id.toString())
        .pipe(catchError(() => EMPTY))
        .subscribe((res) =>
          this.addUser.setValue({
            name: res.name,
            surname: res.surname,
            persNumber: res.persNumber,
            mail: res.mail,
            birthday: res.birthday,
            category: res.category,
            status: res.status,
            // id: res.id,
          })
        );
    }

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
    if (this.new) {
      this.usersService
        .add(this.addUser.value)
        .pipe(
          first(),
          catchError(() => EMPTY)
        )
        .subscribe((res) => {
          console.log(res);
          this.addUser.reset();
          this.router.navigateByUrl('/list');
        });
    } else {
      this.usersService
        .update(this.id.toString(), {
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
          this.router.navigateByUrl('/list');
          localStorage.removeItem('id');
        });
    }
  }

  cancel() {
    localStorage.removeItem('id');
  }
}
