import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { KeycloakTokenParsed } from 'keycloak-js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-administration-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './administration-panel.component.html',
  styleUrl: './administration-panel.component.scss',
})
export class AdministrationPanelComponent implements OnInit {
  authService = inject(AuthService);

  loggedUser: KeycloakTokenParsed | undefined = {};

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser() || undefined;
  }

  logOutUser() {
    return this.authService.logout();
  }
}
