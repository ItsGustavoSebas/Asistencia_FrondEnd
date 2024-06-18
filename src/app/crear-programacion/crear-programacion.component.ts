import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';

interface Dia_Horario {
  id: number; // Agregamos un identificador único
  moduloId: any;
  dia: string;
  horaInicio: any;
  horaFin: any;
  aula: any;
}

interface ProgramacionData {
  nombre: string;
  materia_carreraId: any; 
  docenteId: any; 
  diaHorarioDTOS: Dia_Horario[];
  facultad_gestionId: any; 
}

@Component({
  selector: 'app-crear-programacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-programacion.component.html',
  styleUrls: ['./crear-programacion.component.css']
})
export class CrearProgramacionComponent implements OnInit {
  formData: ProgramacionData = {
    nombre: '',
    materia_carreraId: '',
    docenteId: '',
    facultad_gestionId: '',
    diaHorarioDTOS: [{ id: 1, moduloId: '', dia: '', horaInicio: '', horaFin: '', aula: '' }] // Asignamos un ID inicial
  };
  errorMessage: string = '';
  carreras: any[] = [];
  materias: any[] = [];
  docentes: any[] = [];
  modulos: any[] = [];
  facultadGestionId: any;
  facultadId: any;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadCarreras();
  }

  async loadCarreras() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showError('Token not found');
      return;
    }
    try {
      this.facultadGestionId = this.route.snapshot.paramMap.get('id');
      const fac = await this.userService.getFacultadGestion(this.facultadGestionId, token);
      this.facultadId = fac.facultad.id;
      const carr = await this.userService.getAllCarreraFac(this.facultadId, token);
      this.carreras = carr.carreraList;
      const response = await this.userService.getAllUsers(token);
      this.docentes = response.ourUsersList;
      const mod = await this.userService.getAllModulosFac(this.facultadId, token);
      this.modulos = mod.moduloList;
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  onCarreraChange(event: any) {
    const carreraId = event.target.value;
    if (carreraId) {
      this.loadMaterias(carreraId);
    }
  }

  async loadMaterias(carreraId: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showError('Token not found');
      return;
    }
    try {
      const mat = await this.userService.getAllMateriaCarrera(carreraId, token);
      this.materias = mat.materiaCarreras;
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  addDiaHorario() {
    const nextId = this.formData.diaHorarioDTOS.length + 1; // Generamos el siguiente ID
    this.formData.diaHorarioDTOS.push({ id: nextId, moduloId: '', dia: '', horaInicio: '', horaFin: '', aula: '' });
  }

  removeDiaHorario(index: number) {
    this.formData.diaHorarioDTOS.splice(index, 1);
  }

  async handleSubmit() {
    if (!this.formData.nombre || !this.formData.materia_carreraId || !this.formData.docenteId) {
      this.showError('Por favor completa todos los campos.');
      return;
    }

    this.formData.facultad_gestionId = this.facultadGestionId;

    const confirmRegistration = confirm('¿Estás seguro que deseas registrar esta carrera?');
    if (!confirmRegistration) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await this.userService.createProgramacion(this.formData, token);
      if (response.statusCode === 200) {
        localStorage.setItem('programacionCreated', 'true');
        this.router.navigate(['/programaciones', this.facultadGestionId]);
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

  // Función trackBy para mejorar el rendimiento del *ngFor
  trackByFn(index: number, item: Dia_Horario) {
    return item.id; // Devuelve el ID como identificador único
  }
}
