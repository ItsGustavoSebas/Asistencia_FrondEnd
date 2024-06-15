import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-facultadeslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './facultadeslist.component.html',
  styleUrl: './facultadeslist.component.css'
})
export class FacultadeslistComponent {
  facultades: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
  ) {}
  
  ngOnInit(): void {
    this.loadfacultades();
  }

  async loadfacultades() {
    try {
      const token: any = localStorage.getItem('token');
      let response;
      if (this.searchName){
        response = await this.userService.searchFacultadsByName(this.searchName, token);
      }else{
        response = await this.userService.getAllFacultades2(token);
      }
      if (response) {
        this.facultades = response.facultadList;
      } else {
        this.showError('No facultades found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }


  navigateToUpdate(facultadId: string) {
    this.router.navigate(['/facultades/update', facultadId]);
  }

  navigateToAsistencias(facultadId: string) {
    this.router.navigate(['facultades/asistencias/reporte', facultadId]);
  }

  

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  async deleteFacultad(facultadId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar esta facultad?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deletefacultad(facultadId, token);
        this.loadfacultades();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }
}
