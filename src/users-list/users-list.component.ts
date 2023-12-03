import { CommonModule } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email?: string;
  lastName?: string;
  firstName?: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  providers: [AdminService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users!: Observable<User[]>;

  trackByFn: TrackByFunction<User> = (_, item) => item.id;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsersFromKeycloak();
  }

  getUsersFromKeycloak() {
    this.users = this.adminService.getUsersFromRealm();
  }
}
