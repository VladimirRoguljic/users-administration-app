import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  getLoggedUser() {
    try {
      let userDetails =
        this.keycloakService.getKeycloakInstance().idTokenParsed;
      return userDetails;
    } catch (e) {
      console.log('getLoggedUser Exception', e);
      return undefined;
    }
  }

  logout() {
    this.keycloakService.logout();
  }

  redirectToProfile() {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  getKeyCloakToken(): Promise<string> {
    return this.keycloakService.getToken();
  }
}
