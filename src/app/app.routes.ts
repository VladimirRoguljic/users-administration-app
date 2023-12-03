import { Routes } from '@angular/router';
import { AdministrationPanelComponent } from '../administration-panel/administration-panel.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsersListComponent } from '../users-list/users-list.component';
import { UserComponent } from '../user/user.component';
import { userResolver } from '../resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AdministrationPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users-list',
        component: UsersListComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'user/edit-user/:id',
        component: UserComponent,
        resolve: {
          user: userResolver,
        },
      },
    ],
  },
];
