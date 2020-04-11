import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { UserInventoryComponent } from './user-inventory.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { AppEventService } from 'src/app/shared/app-events.service';
import { RoleService as UserService } from '../../__services__/roles.service';
import { usersMock } from '../__mocks__';
import { EmptyPageComponent } from '../../empty-page/empty-page.component';
import { ExportComponent } from '../../export-component/export.component';
import { AppPaginationComponent } from '../../layouts/app-pagination/app-pagination.component';
import { AlertService } from 'src/app/shared/alert.service';

describe('UserInventoryComponent', () => {
  let component: UserInventoryComponent;
  let fixture: ComponentFixture<UserInventoryComponent>;

  const mockAlert = {
    success: jest.fn(),
    error: jest.fn()
 };

  const mockAppEventService = {
   broadcast: jest.fn(),
   subscribe: jest.fn(),
   getUserData: jest.fn()
   };

   const mockUserService = {
      getUsers: jest.fn().mockReturnValue(of({
        success: true,
        message: '',
        users: [usersMock]
      })),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInventoryComponent, AppPaginationComponent, EmptyPageComponent, ExportComponent ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule, AngularMaterialModule, FormsModule],
      providers: [
        { provide: AppEventService, useValue: mockAppEventService },
        { provide: UserService, useValue: mockUserService },
        { provide: AlertService, useValue: mockAlert},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUsersData', () => {
    const event = {
      name: 'userEvent',
      content: {}
    };
  it('should subscribe to events ', ( () => {
    jest.spyOn(component, 'getUsersData');
    jest.spyOn(mockAppEventService, 'subscribe');
    component.ngOnInit();
    expect(mockAppEventService.subscribe).toBeCalled();
  }));
  it('should call getUserData', () => {
    jest.spyOn(component, 'getUsersData').mockImplementation();
    jest.spyOn(mockAppEventService, 'subscribe');
    component.setPage(1);
    mockAppEventService.broadcast(event);
    expect(mockAppEventService.subscribe).toBeCalled();
    expect(component.pageNo).toEqual(1);
    expect(component.getUsersData).toBeCalled();
    expect(component.users).toEqual([usersMock]);
  });

it('should display an error message if error occured - "GET"', async () => {
  jest.spyOn(component, 'getUsersData');
  jest.spyOn(mockUserService, 'getUsers').mockReturnValue(throwError(new Error()));

  component.getUsersData('');
  fixture.detectChanges();
  expect(component.displayText).toEqual('Something went wrong !');
  jest.restoreAllMocks();
});
});

});
