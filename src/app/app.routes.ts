import { Routes } from '@angular/router';
import { AdministrationPanelComponent } from '../administration-panel/administration-panel.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsersListComponent } from '../users-list/users-list.component';
import { UserComponent } from '../user/user.component';
import { userResolver } from '../resolvers/user.resolver';
import { RolesComponent } from '../roles/roles.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RoleComponent } from '../role/role.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Redirect to 'dashboard' when the path is empty
    pathMatch: 'full',
  },
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
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'role',
        component: RoleComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
