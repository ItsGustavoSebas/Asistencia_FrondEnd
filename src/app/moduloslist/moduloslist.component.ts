import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moduloslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './moduloslist.component.html',
  styleUrl: './moduloslist.component.css'
})
export class ModuloslistComponent {
  modulos: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
  ) {}
  
  ngOnInit(): void {
    this.loadmodulos();
  }

  async loadmodulos() {
    try {
      const token: any = localStorage.getItem('token');
      let response;
      if (this.searchName){
        response = await this.userService.searchModulosByName(this.searchName, token);
      }else{
        response = await this.userService.getAllmodulos(token);
      }
      if (response) {
        this.modulos = response.moduloList;
      } else {
        this.showError('No modulos found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }


  navigateToUpdate(moduloId: string) {
    this.router.navigate(['/modulos/update', moduloId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; 
    }, 3000);
  }

  async deletemodulo(moduloId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar esta modulo?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deletemodulo(moduloId, token);
        this.loadmodulos();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }
}
