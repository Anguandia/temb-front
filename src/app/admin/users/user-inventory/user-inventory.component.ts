import { Component, OnInit } from '@angular/core';
import { AppEventService } from 'src/app/shared/app-events.service';
import { ITEMS_PER_PAGE } from 'src/app/app.constants';
import { RoleService as UserService } from '../../__services__/roles.service';
import { IUsers } from 'src/app/shared/models/roles.model';
import { Subscription, Subject } from 'rxjs';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  templateUrl: './user-inventory.component.html',
  styleUrls: ['../../routes/routes-inventory/routes-inventory.component.scss',
  './user-inventory.component.scss']
})
export class UserInventoryComponent implements OnInit {
  isLoading: boolean;
  totalItems: number;
  userSubscription: Subscription;
  displayText: string;
  pageNo: number;
  pageSize: number;
  users: IUsers[] = [];
  filter: string;

  constructor(
    public userService: UserService,
    public appEventsService: AppEventService,
    private alert: AlertService,
  ) {
    this.pageNo = 1;
    this.pageSize = ITEMS_PER_PAGE;
    this.isLoading = true;
    this.filter = '';
    this.getUsersData(this.filter);
  }

  ngOnInit() {
    this.userSubscription = this.appEventsService
      .subscribe('userEvent', () => this.getUsersData(this.filter));
  }
  getUsersData = (filter) => {
    if (!filter || filter.length > 3) {
      this.isLoading = true;
      this.userService.getUsers(filter).subscribe(usersData => {
        const { users } = usersData;
        this.users = users;
        const total = parseInt(users.length, 10);
        this.totalItems = total;
        this.appEventsService.broadcast({
          name: 'updateHeaderTitle', content:
            { badgeSize: this.totalItems, actionButton: 'Add User' }
        });
        this.isLoading = false;
      },
        () => {
          this.isLoading = false;
            this.users = [];
            this.displayText = 'Something went wrong !';
            return this.alert.error('No user found');
          }
      );
    }
  }

  setPage(page: number): void {
    this.pageNo = page;
    this.getUsersData(this.filter);
  }

}
