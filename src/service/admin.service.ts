import { Injectable } from '@angular/core';
import { environment } from '../assets/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  keyCloakBaseUrl: string = environment.keycloakConfig.url;

  constructor(private http: HttpClient, private router: Router) {}

  // Get users.Returns a stream of users, filtered according to query parameters.
  getUsersFromRealm(searchTerm?: string): Observable<User[]> {
    let params = new HttpParams();

    if (searchTerm) {
      params = params.set('search', searchTerm);

      return this.http.get<User[]>(
        `${this.keyCloakBaseUrl}/admin/realms/master/users`,
        { params },
      );
    }

    return this.http.get<User[]>(
      `${this.keyCloakBaseUrl}/admin/realms/master/users`,
    );
  }

  createNewUser(userData: User): Observable<User> {
    return this.http
      .post<User>(`${this.keyCloakBaseUrl}/admin/realms/master/users`, userData)
      .pipe(
        tap(() => {
          // Redirect to user-list after a successful request
          this.router.navigate(['/users-list']);
        }),
      );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(
      `${this.keyCloakBaseUrl}/admin/realms/master/users/${id}`,
    );
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>(
      `${this.keyCloakBaseUrl}/admin/realms/master/users/${id}`,
    );
  }

  updateUser(id: string, userData: User): Observable<User> {
    return this.http
      .put<User>(
        `${this.keyCloakBaseUrl}/admin/realms/master/users/${id}`,
        userData,
      )
      .pipe(
        tap(() => {
          // Redirect to user-list after a successful request
          this.router.navigate(['/users-list']);
        }),
      );
  }
}
