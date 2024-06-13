import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-materiaslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './materiaslist.component.html',
  styleUrl: './materiaslist.component.css'
})
export class MateriaslistComponent {
  materias: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.loadmaterias();
    this.checkForNotifications();
  }

  checkForNotifications() {
    const materiaCreated = localStorage.getItem('materiaCreated');
    if (materiaCreated) {
      this.toastr.success('materia creada correctamente');
      localStorage.removeItem('materiaCreated');
    }

    const materiaDeleted = localStorage.getItem('materiaDeleted');
    if (materiaDeleted) {
      this.toastr.success('materia eliminada correctamente');
      localStorage.removeItem('materiaDeleted');
    }

    const materiaUpdated = localStorage.getItem('materiaUpdated');
    if (materiaUpdated) {
      this.toastr.success('materia actualizada correctamente');
      localStorage.removeItem('materiaUpdated');
    }
  }

  async loadmaterias() {
    try {
      const token: any = localStorage.getItem('token');
      let response;
      if (this.searchName){
        response = await this.userService.searchMateriasByName(this.searchName, token);
      }else{
        response = await this.userService.getAllMaterias(token);
      }
      if (response) {
        this.materias = response.materiaList;
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
        localStorage.setItem('materiaDeleted', 'true');
        this.checkForNotifications();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }
}
