import { CommonModule } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

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

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersFromKeycloak();
  }

  getUsersFromKeycloak() {
    this.users = this.adminService.getUsersFromRealm();
  }

  goToCreateNewUser() {
    this.router.navigate(['user']);
  }
}
