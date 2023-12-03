import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Observable, map, tap } from 'rxjs';
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

  user!: User;

  trackByFn: TrackByFunction<User> = (_, item) => item.id;

  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersFromKeycloak();
  }

  getUsersFromKeycloak() {
    this.users = this.adminService
      .getUsersFromRealm()
      .pipe(map((users) => [...users].sort()));
  }

  goToCreateNewUser() {
    this.router.navigate(['user']);
  }

  onOpenDeleteConfirmationModal(id: string) {
    this.adminService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }

  editUser(userId: string) {
    this.router.navigate(['user/edit-user', userId]);
  }

  onDeleteUser(id: string) {
    this.adminService
      .deleteUser(id)
      .pipe(
        tap(() => {
          this.closeModal.nativeElement.click();
          this.getUsersFromKeycloak();
        }),
      )
      .subscribe();
  }
}
