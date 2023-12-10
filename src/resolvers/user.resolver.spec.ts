import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { userResolver } from './user.resolver';
import { User } from '../interfaces/user';
import { AdminService } from '../service/admin.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('userResolver', () => {
  let service: AdminService;
  let testControler: HttpTestingController;

  const mockData: User = {
    id: '1',
    username: 'John',
    lastName: 'Doe',
    emailVerified: true,
  };

  const executeResolver: ResolveFn<User> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => userResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    testControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should resolve user by calling getUserById with the correct id', () => {
    // Mock the getUserById method of AdminService using Jasmine spy
    const getUserByIdSpy = spyOn(service, 'getUserById').and.returnValue(
      of(mockData),
    );

    const activatedRouteSnapshot: ActivatedRouteSnapshot = {
      paramMap: {
        get: () => '1', // Mocked 'id'
      },
    } as unknown as ActivatedRouteSnapshot;

    // Define a function that runs the resolver within the injection context
    const runResolverInContext = () => {
      // Execute the resolver with the mock ActivatedRouteSnapshot
      return userResolver(
        activatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<User>;
    };

    const result$ = TestBed.runInInjectionContext(runResolverInContext);

    result$.subscribe((user: User) => {
      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(user.id).toEqual('1');
      expect(user.username).toEqual('John');
      expect(user.lastName).toBe('Doe');
      expect(user.emailVerified).toBe(true);
    });
  });

  afterEach(() => testControler.verify());
});
