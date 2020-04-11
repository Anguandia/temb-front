import { IUserInfo } from './../../shared/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UserObject {
  success: boolean;
  message: string;
  user: {
    name: string;
    email: string;
    phoneNo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = `${environment.tembeaBackEndUrl}/api/v1/users`;

  constructor(private http: HttpClient) {}

  addUser(data: IUserInfo): Observable<UserObject> {
    return this.http.post<UserObject>(this.userUrl, data);
  }
}
