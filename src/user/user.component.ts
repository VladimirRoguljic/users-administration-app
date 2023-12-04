import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { User } from '../interfaces/user';
import { RolesService } from '../service/roles.service';
import { Role } from '../interfaces/role';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  form!: FormGroup;

  isEditUser: boolean = false;

  user!: User;

  roleMapping!: Observable<Role[]>;

  rolesToAssign!: Observable<Role[]>;

  @ViewChild('closeModal') closeModal!: ElementRef;

  get emailVerifiedText(): string {
    return this.form.get('emailVerified')?.value ? 'YES' : 'NO';
  }

  get submitButtonClass(): string {
    return this.form.valid ? 'btn-primary' : 'btn-secondary';
  }

  selectedRoles: Set<Role> = new Set<Role>();

  roleListRepresentations!: Role[];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RolesService,
  ) {}

  ngOnInit(): void {
    // Initialize the form group and form controls
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      emailVerified: [false],
      lastName: [''],
      firstName: [''],
    });

    this.route.data.subscribe((data) => {
      this.user = data['user'];

      // Update the form with the user data
      if (this.user) {
        this.isEditUser = true;
        this.form.patchValue({
          username: this.user.username,
          email: this.user.email,
          emailVerified: this.user.emailVerified,
          lastName: this.user.lastName,
          firstName: this.user.firstName,
        });

        this.getRoleMapping(this.user.id);
      }
    });
  }

  onSubmit() {
    // Handle form submission and create new user
    this.adminService.createNewUser(this.form.value).subscribe();
  }

  onCancel() {
    this.router.navigate(['/users-list']);
  }

  onUpdateUser() {
    this.adminService.updateUser(this.user.id, this.form.value).subscribe();
  }

  getRoleMapping(userId: string) {
    this.roleMapping = this.roleService
      .getRoleMapping(userId)
      .pipe(map((res) => res['realmMappings']));
  }

  getAvailableRoles() {
    this.rolesToAssign = this.roleService.getAvailableRolesForUser(
      this.user.id,
    );
  }

  toggleRoleSelection(role: Role): void {
    if (this.selectedRoles.has(role)) {
      this.selectedRoles.delete(role);
    } else {
      this.selectedRoles.add(role);
    }

    this.roleListRepresentations = Array.from(this.selectedRoles);
  }

  // Check if at least one role is selected
  hasSelectedRoles(): boolean {
    return this.selectedRoles.size > 0;
  }

  assignRoleToUser() {
    this.roleService
      .assignRoleToSpecificUser(this.user.id, this.roleListRepresentations)
      .pipe(
        tap(() => {
          // Redirect to roles after a successful request
          // this.closeModal.nativeElement.click();
          this.getRoleMapping(this.user.id);
        }),
      )
      .subscribe();
  }
}
