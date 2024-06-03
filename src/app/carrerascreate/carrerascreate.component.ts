import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';

interface Materia {
  id: number;
  name: string;
}

interface Semestre {
  materias: { materia: Materia | null }[];
}

interface CarreraData {
  name: string;
  facultadId: any; 
  semestres: Semestre[];
}

@Component({
  selector: 'app-carrerascreate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrerascreate.component.html',
  styleUrls: ['./carrerascreate.component.css']
})
export class CarrerascreateComponent implements OnInit {
  formData: CarreraData = {
    name: '',
    facultadId: '',
    semestres: [
      { materias: [{ materia: null }] } 
    ]
  };
  errorMessage: string = '';
  facultades: any[] = [];
  materias: Materia[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadCarrera();
  }

  async loadCarrera() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showError('Token not found');
      return;
    }

    try {
      this.facultades = await this.userService.getAllFacultades(token);
      this.materias = await this.userService.getAllMaterias(token);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  addSemestre() {
    this.formData.semestres.push({ materias: [{ materia: null }] });
  }

  addMateria(semestreIndex: number) {
    this.formData.semestres[semestreIndex].materias.push({ materia: null });
  }

  removeMateria(semestreIndex: number, materiaIndex: number) {
    this.formData.semestres[semestreIndex].materias.splice(materiaIndex, 1);
    if (this.formData.semestres[semestreIndex].materias.length === 0) {
      this.formData.semestres.splice(semestreIndex, 1);
    }
  }

  async handleSubmit() {
    if (!this.formData.name || !this.formData.facultadId) {
      this.showError('Por favor completa todos los campos.');
      return;
    }

    const confirmRegistration = confirm('¿Estás seguro que deseas registrar esta carrera?');
    if (!confirmRegistration) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      console.log(this.formData.semestres)
      const materias = this.formData.semestres
        .flatMap((semestre, index) =>
          semestre.materias
            .filter(materia => materia.materia) 
            .map(materia => ({ materiaId: materia.materia, semestre: index + 1 }))
        );
      
      const newCarreraData = {
        name: this.formData.name,
        facultad: {
          id: this.formData.facultadId,
        },
        materias
      };

      console.log('New Carrera Data:', newCarreraData);

      const response = await this.userService.createCarrera(newCarreraData, token);
      console.log('Registration Response:', response);

      if (response.statusCode === 200) {
        this.router.navigate(['/carreras']);
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
