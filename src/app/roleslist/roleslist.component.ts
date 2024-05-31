import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-roleslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './roleslist.component.html',
  styleUrl: './roleslist.component.css'
})
export class RoleslistComponent {
  roles: any[] = [];
  errorMessage: string = ''
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
  ) {}
  isAdmin:boolean = false;
  isUser:boolean = false;
  
  ngOnInit(): void {
    this.loadRoles();
  }

  async loadRoles() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllRoles(token);
      if (response) {
        this.roles = response;
      } else {
        this.showError('No roles found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }


  navigateToUpdate(roleId: string) {
    this.router.navigate(['/roles/update', roleId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }

  getPermissionsNames(role: any): string {
    return role.permissions.map((permission: any) => permission.name).join(', ');
  }
}
