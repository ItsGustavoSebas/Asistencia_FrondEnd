import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carreraslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './carreraslist.component.html',
  styleUrl: './carreraslist.component.css'
})
export class CarreraslistComponent {
  carreras: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
  ) {}
  
  ngOnInit(): void {
    this.loadcarreras();
  }

  async loadcarreras() {
    try {
      const token: any = localStorage.getItem('token');
      let response;
      if (this.searchName){
        response = await this.userService.searchCarrerasByName(this.searchName, token);
      }else{
        response = await this.userService.getAllCarreras(token);
      }
      if (response) {
        this.carreras = response.carreraList;
      } else {
        this.showError('No carreras found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }


  navigateToUpdate(carreraId: string) {
    this.router.navigate(['/carreras/update', carreraId]);
  }

  navigateToMalla(roleId: string) {
    this.router.navigate(['/carreras/materias', roleId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; 
    }, 3000);
  }

  async deleteCarrera(carreraId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar esta carrera?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteCarrera(carreraId, token);
        this.loadcarreras();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

}
