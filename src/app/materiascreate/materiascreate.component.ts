import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-materiascreate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './materiascreate.component.html',
  styleUrl: './materiascreate.component.css'
})
export class MateriascreateComponent {
  formData: any = {
    name: '',
    sigla: '',
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }


  async handleSubmit() {
    if (!this.formData.name || !this.formData.sigla) {
      this.showError('Por favor completa todos los campos.');
      return;
    }

    const confirmRegistration = confirm('Estas seguro que deseas crear este Materia?');
    if (!confirmRegistration) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const newMateriaData = {
        name: this.formData.name,
        sigla: this.formData.sigla,
      };

      console.log('New Materia Data:', newMateriaData);

      const response = await this.userService.createMateria(newMateriaData, token);
      console.log('Registration Response:', response);

      if (response.statusCode === 200) {
        localStorage.setItem('materiaCreated', 'true');
        this.router.navigate(['/materias']);
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
