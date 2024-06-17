import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-asistencias-docente',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './asistencias-docente.component.html',
  styleUrl: './asistencias-docente.component.css'
})
export class AsistenciasDocenteComponent {
  asistencias: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  usuarioNombre: any;
  docenteId: any;
  filterEstado: string = 'all';
  activeButton: string = 'all';
  startDate: string = '';
  endDate: string = '';
  showColumnSelection = false;
  columns = [
    { name: 'materiaSigla', displayName: 'Materia', selected: true },
    { name: 'grupoName', displayName: 'Grupo', selected: true },
    { name: 'estado', displayName: 'Estado', selected: true },
    { name: 'horaInicio', displayName: 'Hora de Inicio', selected: true },
    { name: 'horaFin', displayName: 'Hora de Fin', selected: true },
    { name: 'fecha', displayName: 'Fecha', selected: true },
    { name: 'hora', displayName: 'Hora Marcada', selected: true }
  ];
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadasistencias();
  }

  setActiveButton(estado: string) {
    this.activeButton = estado;
  }

  downloadAsExcel() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const nombre = this.asistencias.length > 0 ? this.asistencias[0].nombre : 'asistencias';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.asistencias.map(asistencia =>
        selectedColumns.reduce((acc, col) => {
          let value = col.name.split('.').reduce((o, i) => o ? o[i] : '', asistencia);
          if (col.name === 'fecha') {
            value = new Date(value).toLocaleDateString('es-ES');
          }
          if (col.name === 'hora' && (asistencia.estado === 'Licencia' || asistencia.estado === 'Falta')) {
            value = '';
          } else if (col.name === 'hora') {
            value = new Date(value).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
          }
          return { ...acc, [col.displayName]: value };
        }, {})
      )
    );
    const wb: XLSX.WorkBook = { Sheets: { 'Asistencias': ws }, SheetNames: ['Asistencias'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `lista_de_asistencias_${nombre}.xlsx`);
  }
  
  downloadAsPDF() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const nombre = this.asistencias.length > 0 ? this.asistencias[0].nombre : 'asistencias';
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [selectedColumns.map(col => col.displayName)],
      body: this.asistencias.map(asistencia =>
        selectedColumns.map(col => {
          let value = col.name.split('.').reduce((o, i) => o ? o[i] : '', asistencia);
          if (col.name === 'fecha') {
            value = new Date(value).toLocaleDateString('es-ES');
          }
          if (col.name === 'hora' && (asistencia.estado === 'Licencia' || asistencia.estado === 'Falta')) {
            value = '';
          } else if (col.name === 'hora') {
            value = new Date(value).toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
          }
          return value;
        })
      )
    });
    doc.save(`lista_de_asistencias_${nombre}.pdf`);
  }
  


  async loadasistencias() {
    try {
      this.docenteId = this.route.snapshot.paramMap.get('id');
      const token: any = localStorage.getItem('token');
      let usuario = await this.userService.getUsersById(this.docenteId, token);
      this.usuarioNombre = usuario.ourUsers.name;
      let response;
      
      if (this.filterEstado === 'all') {
        response = await this.userService.getAllAsistenciasDocente(this.docenteId, token, this.startDate, this.endDate);
      } else {
        response = await this.userService.getAllAsistenciasDocenteEstado(this.docenteId, this.filterEstado, token, this.startDate, this.endDate);
      }
      console.log(response)
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
}
