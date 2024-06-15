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
  selector: 'app-asistencias-reporte-fac',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './asistencias-reporte-fac.component.html',
  styleUrl: './asistencias-reporte-fac.component.css'
})
export class AsistenciasReporteFacComponent {
  asistencias: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  startDate: string = '';
  facultadId: any;
  endDate: string = '';
  showColumnSelection = false;
  columns = [
    { name: 'nombre', displayName: 'Docente', selected: true },
    { name: 'numGrupos', displayName: 'Grupos Asignados', selected: true },
    { name: 'numProgramaciones', displayName: 'Horarios Programados', selected: true },
    { name: 'asistencias', displayName: 'Total Asistencias', selected: true },
    { name: 'licencias', displayName: 'Total Licencias', selected: true },
    { name: 'atrasos', displayName: 'Total Atrasos', selected: true },
    { name: 'faltas', displayName: 'Total Faltas', selected: true }
  ];
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
 
  
  ngOnInit(): void {
    this.loadasistencias();
  }

  navigateToDocente(docenteId: string) {
    this.router.navigate(['/asistencias/docente', docenteId]);
  }
  
  navigateToDetalles() {
    this.facultadId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['facultades/asistencias/detalles', this.facultadId]);
  }

  async loadasistencias() {
    try {
      this.facultadId = this.route.snapshot.paramMap.get('id');
      const token: any = localStorage.getItem('token');
      let response;
      if (this.searchName) {
        response = await this.userService.getAllasistenciasNameFac(token, this.facultadId, this.searchName, this.startDate, this.endDate);
      } else {
        response = await this.userService.getAllasistenciasFac(token, this.facultadId, this.startDate, this.endDate);
      }
      if (response) {
        this.asistencias = response;
      } else {
        this.showError('No asistencias found.');
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

  downloadAsExcel() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.asistencias.map(asistencia =>
        selectedColumns.reduce((acc, col) => ({ ...acc, [col.displayName]: asistencia[col.name] }), {})
      )
    );
    const wb: XLSX.WorkBook = { Sheets: { 'Asistencias': ws }, SheetNames: ['Asistencias'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'asistencias.xlsx');
  }

  downloadAsPDF() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [selectedColumns.map(col => col.displayName)],
      body: this.asistencias.map(asistencia =>
        selectedColumns.map(col => asistencia[col.name])
      )
    });
    doc.save('AsistenciasReport.pdf');
  }
}

