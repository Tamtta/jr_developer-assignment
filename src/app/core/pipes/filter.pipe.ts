import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(users: IUser[], filterText: string) {
    if (users.length === 0 || filterText === '') {
      return users;
    } else {
      return users.filter((user) => {
        return (
          user.name.toLowerCase().includes(filterText.toLowerCase()) ||
          user.surname.toLowerCase().includes(filterText.toLowerCase()) ||
          user.mail.toLowerCase().includes(filterText.toLowerCase()) ||
          +user.persNumber === +filterText ||
          user.category.toLowerCase() === filterText.toLowerCase() ||
          user.status.toLowerCase() === filterText.toLowerCase() ||
          user.birthday.includes(filterText)
        );
      });
    }
  }
}
