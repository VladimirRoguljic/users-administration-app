import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected keycloackAngular: KeycloakService
  ) {
    super(router, keycloackAngular);
  }

  override isAccessAllowed(
    route: ActivatedRouteSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      if (!this.authenticated) {
        this.keycloackAngular.login(), resolve(false);
        return;
      }

      const requiredRoles = route.data['roles'];
      let granted: boolean = true;

      if (requiredRoles && requiredRoles.length > 0) {
        granted = false;
      }

      for (const requiredRole in requiredRoles) {
        if (this.roles.indexOf(requiredRole) > -1) {
          granted = true;
          break;
        }
      }

      resolve(granted);
    });
  }
}
