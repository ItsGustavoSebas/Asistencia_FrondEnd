import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-materiasupdate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './materiasupdate.component.html',
  styleUrl: './materiasupdate.component.css'
})
export class MateriasupdateComponent {
  materiaId: any;
  materiaData: any = {};
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMateriaById();
  }

  async getMateriaById() {
    this.materiaId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.materiaId || !token) {
      this.showError('User ID or Token is Required');
      return;
    }

    try {
      let materiaDataResponse = await this.userService.getmateriasById(this.materiaId, token);
      const { name, sigla } = materiaDataResponse;
      this.materiaData = { name, sigla };
      } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateMateria() {
    if (!this.materiaData.name || !this.materiaData.sigla) {
      this.showError('Por favor completa todos los campos requridos.');
      return;
    }
    const confirmUpdate = confirm('¿Estás seguro de que quieres actualizar esta materia?');
    if (!confirmUpdate) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const updatedMateriaData = {
        name: this.materiaData.name,
        sigla: this.materiaData.sigla
      };

      const res = await this.userService.updatemateria(this.materiaId, updatedMateriaData, token);
      console.log(res);

      if (res.statusCode === 200) {
        localStorage.setItem('materiaUpdated', 'true');
        this.router.navigate(['/materias']);
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
