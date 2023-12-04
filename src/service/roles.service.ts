import { Injectable } from '@angular/core';
import { environment } from '../assets/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Role } from '../interfaces/role';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  keyCloakBaseUrl: string = environment.keycloakConfig.url;

  constructor(private http: HttpClient, private router: Router) {}

  getRolesFromRealm(): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${this.keyCloakBaseUrl}/admin/realms/master/roles`,
    );
  }

  createNewRole(roleData: Role): Observable<Role> {
    return this.http
      .post<Role>(`${this.keyCloakBaseUrl}/admin/realms/master/roles`, roleData)
      .pipe(
        tap(() => {
          // Redirect to roles after a successful request
          this.router.navigate(['/roles']);
        }),
      );
  }

  deleteRole(roleName: string): Observable<string> {
    return this.http.delete<string>(
      `${this.keyCloakBaseUrl}/admin/realms/master/roles/${roleName}`,
    );
  }

  getRoleByName(roleName: string): Observable<Role> {
    return this.http.get<Role>(
      `${this.keyCloakBaseUrl}/admin/realms/master/roles/${roleName}`,
    );
  }

  getRoleMapping(userId: string): Observable<Role> {
    return this.http.get<Role>(
      `${this.keyCloakBaseUrl}/admin/realms/master/users/${userId}/role-mappings`,
    );
  }

  getAvailableRolesForUser(userId: string): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${this.keyCloakBaseUrl}/admin/realms/master/users/${userId}/role-mappings/realm/available`,
    );
  }

  assignRoleToSpecificUser(
    userId: string,
    roleList: Role[],
  ): Observable<Role[]> {
    return this.http.post<Role[]>(
      `${this.keyCloakBaseUrl}/admin/realms/master/users/${userId}/role-mappings/realm/`,
      roleList,
    );
  }
}
