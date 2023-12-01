import { Routes } from '@angular/router';
import { AdministrationPanelComponent } from '../administration-panel/administration-panel.component';
import { AuthGuard } from '../guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdministrationPanelComponent,
    canActivate: [AuthGuard],
  },
];
