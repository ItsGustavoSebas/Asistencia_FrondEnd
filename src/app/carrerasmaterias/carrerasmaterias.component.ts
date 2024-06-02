import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrerasmaterias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrerasmaterias.component.html',
  styleUrls: ['./carrerasmaterias.component.css']
})
export class CarrerasmateriasComponent {
  materiaId: any;
  materias: any[] = [];
  errorMessage: string = '';
  semestres: any[] = [];

  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMaterias();
  }

  async loadMaterias() {
    try {
      this.materiaId = this.route.snapshot.paramMap.get('id');
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllCarrera_Materias(this.materiaId, token);
      if (response) {
        this.materias = response;
        this.organizeBySemester();
      } else {
        this.showError('No carreras found.');
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

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
