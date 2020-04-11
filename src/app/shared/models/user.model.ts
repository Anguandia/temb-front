export interface IUser {
  id: string;
  firstName: string;
  first_name: string;
  lastName: string;
  last_name: string;
  email: string;
  name: string;
  picture: string;
  roles: Array<string>;
  locations: Array<{ id: number, name: string, role: string }>;
}

export interface IUserInfo {
  slackUrl?: string;
  email?: string;
}

export class UserInfo implements IUserInfo {
  constructor(
    public slackUrl?: string,
    public email?: string
  ) { }
}
