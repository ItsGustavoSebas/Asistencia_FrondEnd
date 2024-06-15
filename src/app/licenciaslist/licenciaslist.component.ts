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
  selector: 'app-licenciaslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './licenciaslist.component.html',
  styleUrl: './licenciaslist.component.css'
})
export class LicenciaslistComponent {
  licencias: any[] = [];
  errorMessage: string = '';
  searchName: string = '';
  filterEstado: string = 'all';
  activeButton: string = 'all';
  startDate: string = '';
  endDate: string = '';
  showColumnSelection = false;
  columns = [
    { name: 'nombre', displayName: 'Docente', selected: true },
    { name: 'fechaInicio', displayName: 'Fecha de Inicio', selected: true },
    { name: 'fechaFin', displayName: 'Fecha de Fin', selected: true },
    { name: 'motivo', displayName: 'Motivo', selected: true },
    { name: 'aprobado', displayName: 'Estado', selected: true },
  ];
  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadlicencias();
    this.checkForNotifications();
  }

  checkForNotifications() {
    const licenciaAprobada = localStorage.getItem('licenciaAprobada');
    if (licenciaAprobada) {
      this.toastr.success('Licencia aprobada correctamente');
      localStorage.removeItem('licenciaAprobada');
    }

    const licenciaRechazada = localStorage.getItem('licenciaRechazada');
    if (licenciaRechazada) {
      this.toastr.success('Licencia rechazada correctamente');
      localStorage.removeItem('licenciaRechazada');
    }
  }

  setActiveButton(estado: string) {
    this.activeButton = estado;
  }

  downloadLicenciaAsExcel() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.licencias.map(licencia =>
        selectedColumns.reduce((acc, col) => {
          let value = col.name.split('.').reduce((o, i) => o ? o[i] : '', licencia);
          if (col.name === 'aprobado') {
            value = value === null ? 'Pendiente' : value ? 'Aprobado' : 'Rechazado';
          } else if (col.name === 'fechaInicio' || col.name === 'fechaFin') {
            value = new Date(value).toLocaleDateString('es-ES');
          }
          return { ...acc, [col.displayName]: value };
        }, {})
      )
    );
    const wb: XLSX.WorkBook = { Sheets: { 'Licencias': ws }, SheetNames: ['Licencias'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'licencias.xlsx');
  }
  
  downloadLicenciaAsPDF() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [selectedColumns.map(col => col.displayName)],
      body: this.licencias.map(licencia =>
        selectedColumns.map(col => {
          let value = col.name.split('.').reduce((o, i) => o ? o[i] : '', licencia);
          if (col.name === 'aprobado') {
            value = value === null ? 'Pendiente' : value ? 'Aprobado' : 'Rechazado';
          } else if (col.name === 'fechaInicio' || col.name === 'fechaFin') {
            value = new Date(value).toLocaleDateString('es-ES');
          }
          return value;
        })
      )
    });
    doc.save('licencias.pdf');
  }


  async loadlicencias() {
    try {
      const token: any = localStorage.getItem('token');
      let response;
      
      if (this.filterEstado === 'all') {
        response = await this.userService.getAllLicencias(token, this.startDate, this.endDate);
      } else {
        response = await this.userService.getAllLicenciasEstado(this.filterEstado, token, this.startDate, this.endDate);
      }
      console.log(response)
      if (response) {
        this.licencias = response;
      } else {
        this.showError('No licencias found.');
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

  async aprobarLicencia(licenciaId: string) {
    const confirma = confirm('¿Estás seguro que deseas aprobar esta licencia?');
    if (confirma) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.aprobarLicencia(licenciaId, token);
        localStorage.setItem('licenciaAprobada', 'true');
        this.loadlicencias();
        this.checkForNotifications();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  async rechazarLicencia(carreraId: string) {
    const confirma = confirm('¿Estás seguro que deseas rechazar esta licencia?');
    if (confirma) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.rechazarLicencia(carreraId, token);
        localStorage.setItem('licenciaRechazada', 'true');
        this.loadlicencias();
        this.checkForNotifications();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }
}
