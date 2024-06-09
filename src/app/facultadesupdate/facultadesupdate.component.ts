import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facultadesupdate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facultadesupdate.component.html',
  styleUrl: './facultadesupdate.component.css'
})
export class FacultadesupdateComponent {
  facultadId: any;
  facultadData: any = {};
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFacultadById();
  }

  async getFacultadById() {
    this.facultadId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.facultadId || !token) {
      this.showError('User ID or Token is Required');
      return;
    }

    try {
      let facultadDataResponse = await this.userService.getfacultadsById(this.facultadId, token);
      const { name, sigla } = facultadDataResponse;
      this.facultadData = { name, sigla };
      } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateFacultad() {
    if (!this.facultadData.name) {
      this.showError('Por favor completa todos los campos requridos.');
      return;
    }
    const confirmUpdate = confirm('¿Estás seguro de que quieres actualizar esta facultad?');
    if (!confirmUpdate) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const updatedFacultadData = {
        name: this.facultadData.name,
      };

      const res = await this.userService.updatefacultad(this.facultadId, updatedFacultadData, token);
      console.log(res);

      if (res.statusCode === 200) {
        this.router.navigate(['/facultades/f']);
      } else {
        this.showError(res.message);
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
