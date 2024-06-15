import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-asistenciasreporte',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './asistenciasreporte.component.html',
  styleUrls: ['./asistenciasreporte.component.css']
})
export class AsistenciasreporteComponent {
  asistencias: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  startDate: string = '';
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
  ) {}
 
  
  ngOnInit(): void {
    this.loadasistencias();
  }

  navigateToDocente(docenteId: string) {
    this.router.navigate(['/asistencias/docente', docenteId]);
  }

  async loadasistencias() {
    try {
      const token: any = localStorage.getItem('token');
      let response;
      if (this.searchName) {
        response = await this.userService.getAllasistenciasName(token, this.searchName, this.startDate, this.endDate);
      } else {
        response = await this.userService.getAllasistencias(token, this.startDate, this.endDate);
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
