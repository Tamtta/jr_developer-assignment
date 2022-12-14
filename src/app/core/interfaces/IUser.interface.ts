export interface IUser {
  id: number;
  name: string;
  surname: string;
  persNumber: string;
  mail: string;
  birthday: string;
  category: string;
  status: string;
}

export interface Update {
  old: IUser;
  new: IUser;
}
