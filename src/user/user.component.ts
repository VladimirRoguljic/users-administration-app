import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { User } from '../interfaces/user';

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

  get emailVerifiedText(): string {
    return this.form.get('emailVerified')?.value ? 'YES' : 'NO';
  }

  get submitButtonClass(): string {
    return this.form.valid ? 'btn-primary' : 'btn-secondary';
  }

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
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
}
