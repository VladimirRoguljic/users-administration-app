import {
  Component,
  ElementRef,
  OnInit,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { RolesService } from '../service/roles.service';
import { Role } from '../interfaces/role';
import { Observable, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  roles!: Observable<Role[]>;

  role!: Role;

  trackByFn: TrackByFunction<Role> = (_, item) => item.id;

  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(private roleService: RolesService, private router: Router) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roles = this.roleService
      .getRolesFromRealm()
      .pipe(map((roles) => [...roles].sort()));
  }

  goToCreateRole() {
    this.router.navigate(['role']);
  }

  onOpenDeleteRoleConfirmationModal(roleName: string) {
    this.roleService
      .getRoleByName(roleName)
      .subscribe((role) => (this.role = role));
  }

  onDeleteRole(roleName: string) {
    this.roleService
      .deleteRole(roleName)
      .pipe(
        tap(() => {
          this.closeModal.nativeElement.click();
          this.getRoles();
        }),
      )
      .subscribe();
  }
}
