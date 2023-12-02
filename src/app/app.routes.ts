import { Routes } from '@angular/router';
import { AdministrationPanelComponent } from '../administration-panel/administration-panel.component';
import { AuthGuard } from '../guard/auth.guard';
import { UsersListComponent } from '../users-list/users-list.component';

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
    ],
  },
];
