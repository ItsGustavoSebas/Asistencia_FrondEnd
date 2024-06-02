import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})


export class UserslistComponent implements OnInit {

  users: any[] = [];
  errorMessage: string = ''
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
  ) {}
  isAdmin:boolean = false;
  isUser:boolean = false;
  
  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllUsers(token);
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.users = response.ourUsersList;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  

  async deleteUser(userId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar este usuario?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteUser(userId, token);
        // Refresh the user list after deletion
        this.loadUsers();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(userId: string) {
    this.router.navigate(['/update', userId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
  getRoleNames(user: any): string {
    return user.roles.map((role: any) => role.name).join(', ');
  }
}
