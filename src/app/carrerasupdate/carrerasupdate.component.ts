import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
interface Materia {
  id: string;
  name: string;
}
@Component({
  selector: 'app-carrerasupdate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrerasupdate.component.html',
  styleUrls: ['./carrerasupdate.component.css']
})
export class CarrerasupdateComponent implements OnInit {
  carreraId: any;
  carreraData: any = {};
  errorMessage: string = '';
  materias: any[] = [];
  facultades: any[] = [];
  carrera_materias: any[] = [];
  semestres: any[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCarreraById();
  }

  async getCarreraById() {
    this.carreraId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.carreraId || !token) {
      this.showError('User ID or Token is Required');
      return;
    }

    try {
      let carreraDataResponse = await this.userService.getCarrerasById(this.carreraId, token);
      this.facultades = await this.userService.getAllFacultades(token);
      this.materias = await this.userService.getAllMaterias(token);
      if (this.materias) {
        this.organizeBySemester();
      } else {
        this.showError('No carreras found.');
      }
      this.carrera_materias = await this.userService.getAllCarrera_Materias(this.carreraId, token);
      const { name, facultad } = carreraDataResponse;
      this.carreraData = { name, facultad };
      console.log(this.semestres)
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async updateCarrera() {
    const confirmUpdate = confirm('¿Estás seguro de que quieres actualizar esta carrera?');
    if (!confirmUpdate) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const newCarreraData = {
        name: this.carreraData.name,
        facultad: {
          id: this.carreraData.facultad.id,
        },
        semestre: this.semestres
      };
      console.log(newCarreraData)

      const res = await this.userService.updateCarrera(this.carreraId, this.carreraData, token);
      console.log(res);

      if (res.statusCode === 200) {
        this.router.navigate(['/carreras']);
      } else {
        this.showError(res.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  organizeBySemester() {
    const semestresMap: any = {};
    this.materias.forEach(materia => {
      if (!semestresMap[materia.semestre]) {
        semestresMap[materia.semestre] = [];
      }
      semestresMap[materia.semestre].push(materia);
    });
    this.semestres = Object.keys(semestresMap).map(key => ({
      semestre: key,
      materias: semestresMap[key]
    }));
  }

  addSemestre() {
    this.semestres.push({ semestre: this.semestres.length + 1, materias: [] });
  }

  addMateria(semestreIndex: number) {
    this.semestres[semestreIndex].materias.push({ materia: '' });
  }

  removeMateria(semestreIndex: number, materiaIndex: number) {
    this.semestres[semestreIndex].materias.splice(materiaIndex, 1);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
