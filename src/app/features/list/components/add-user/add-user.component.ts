import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, first } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/IUser.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addUser!: FormGroup;
  // users: IUser[] = [];
  // public usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject(
  //   <IUser[]>[]
  // );

  constructor(private usersService: UsersService, private router: Router) {}

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
        this.router.navigateByUrl('/list');
      });
  }
}
