import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facultadescreate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './facultadescreate.component.html',
  styleUrl: './facultadescreate.component.css'
})
export class FacultadescreateComponent {
  formData: any = {
    name: '',
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }


  async handleSubmit() {
    if (!this.formData.name) {
      this.showError('Por favor completa todos los campos.');
      return;
    }

    const confirmRegistration = confirm('Estas seguro que deseas crear este Facultad?');
    if (!confirmRegistration) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const newFacultadData = {
        name: this.formData.name,
      };

      console.log('New Facultad Data:', newFacultadData);

      const response = await this.userService.createFacultad(newFacultadData, token);
      console.log('Registration Response:', response);

      if (response.statusCode === 200) {
        this.router.navigate(['/facultades']);
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
