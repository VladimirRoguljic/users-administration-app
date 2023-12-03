import { Injectable } from '@angular/core';
import { environment } from '../assets/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  keyCloakBaseUri: string = environment.keycloakConfig.url;

  constructor(private http: HttpClient) {}

  // Get users.Returns a stream of users, filtered according to query parameters.
  getUsersFromRealm(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.keyCloakBaseUri}/admin/realms/master/users`,
    );
  }
}
