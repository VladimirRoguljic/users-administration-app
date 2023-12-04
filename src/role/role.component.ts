import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  roleForm!: FormGroup;

  get submitButtonClass(): string {
    return this.roleForm.valid ? 'btn-primary' : 'btn-secondary';
  }

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmitRoleForm() {
    this.roleService.createNewRole(this.roleForm.value).subscribe();
  }

  onCancelRoleForm() {
    this.router.navigate(['/roles']);
  }
}
