import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-gestiones-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './gestiones-list.component.html',
  styleUrl: './gestiones-list.component.css'
})
export class GestionesListComponent {
  gestiones: any[] = [];
  errorMessage: string = '';
  facultadId: any;
  facultadNombre: any;
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
 
  
  ngOnInit(): void {
    this.loadgestiones();
  }

  navigateToFechas(gestionId: string) {
    this.router.navigate(['/fechas', gestionId]);
  }

  navigateToProgramaciones(gestionId: string) {
    this.router.navigate(['/programaciones', gestionId]);
  }

  async loadgestiones() {
    try {
      this.facultadId = this.route.snapshot.paramMap.get('id');
      const token: any = localStorage.getItem('token');
      let facultad = await this.userService.getfacultadsById(this.facultadId, token);
      this.facultadNombre = facultad.name;
      let response;
      response = await this.userService.getAllGestiones(this.facultadId, token);
      if (response) {
        this.gestiones = response.facultadGestions;
      } else {
        this.showError('No gestiones found.');
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
