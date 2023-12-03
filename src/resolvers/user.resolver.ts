import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { inject } from '@angular/core';
import { Observable, filter, take } from 'rxjs';
import { User } from '../interfaces/user';

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
): Observable<User> => {
  const adminService = inject(AdminService);

  const userId: string = route.paramMap.get('id') || '';

  return adminService.getUserById(userId).pipe(
    filter<User>((user: User) => !!user),
    take(1),
  );
};
