import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-materiaslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './materiaslist.component.html',
  styleUrl: './materiaslist.component.css'
})
export class MateriaslistComponent {
  materias: any[] = [];
  errorMessage: string = ''
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
  ) {}
  
  ngOnInit(): void {
    this.loadmaterias();
  }

  async loadmaterias() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllMaterias(token);
      if (response) {
        this.materias = response;
      } else {
        this.showError('No materias found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }


  navigateToUpdate(materiaId: string) {
    this.router.navigate(['/materias/update', materiaId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  async deleteMateria(materiaId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar esta materia?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deletemateria(materiaId, token);
        this.loadmaterias();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }
}
