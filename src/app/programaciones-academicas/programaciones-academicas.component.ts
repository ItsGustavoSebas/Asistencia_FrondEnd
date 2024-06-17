import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DiaHorarioDTO {
  dia: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  modulo: string;
}

interface Programacion {
  siglas: string;
  nombre: string;
  materia: string;
  semestre: string;
  docente: string;
  diaHorarioDTOS: DiaHorarioDTO[];
}

@Component({
  selector: 'app-programaciones-academicas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './programaciones-academicas.component.html',
  styleUrls: ['./programaciones-academicas.component.css']
})
export class ProgramacionesAcademicasComponent {
  programacions: Programacion[] = [];
  gestionId: any;
  errorMessage: string = '';
  searchName: string = '';
  showColumnSelection = false;
  columns = [
    { name: 'siglas', displayName: 'Sigla', selected: true },
    { name: 'nombre', displayName: 'Grupo', selected: true },
    { name: 'materia', displayName: 'Materia', selected: true },
    { name: 'semestre', displayName: 'Semestre', selected: true },
    { name: 'docente', displayName: 'Docente', selected: true }
  ];

  repetitiveColumns = [
    { name: 'dia', displayName: 'Día', selected: true },
    { name: 'horario', displayName: 'Horario', selected: true },
    { name: 'aula', displayName: 'Aula', selected: true }
  ];

  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProgramacions();
    this.checkForNotifications();
  }

  checkForNotifications() {
    const programacionCreated = localStorage.getItem('programacionCreated');
    if (programacionCreated) {
      this.toastr.success('programacion creada correctamente');
      localStorage.removeItem('programacionCreated');
    }

    const programacionDeleted = localStorage.getItem('programacionDeleted');
    if (programacionDeleted) {
      this.toastr.success('programacion eliminada correctamente');
      localStorage.removeItem('programacionDeleted');
    }

    const programacionUpdated = localStorage.getItem('programacionUpdated');
    if (programacionUpdated) {
      this.toastr.success('programacion actualizada correctamente');
      localStorage.removeItem('programacionUpdated');
    }
  }

  async loadProgramacions() {
    try {
      const token: any = localStorage.getItem('token');
      this.gestionId = this.route.snapshot.paramMap.get('id');
      const response = await this.userService.getAllProgramaciones(this.gestionId, token);
      if (response) {
        this.programacions = response;
      } else {
        this.showError('No programaciones found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  navigateToUpdate(programacionId: string) {
    this.router.navigate(['/programaciones/update', programacionId]);
  }

  navigateToCrear(programacionId: string) {
    this.router.navigate(['/programaciones/crear', programacionId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; 
    }, 3000);
  }

  async deleteProgramacion(programacionId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar esta programacion?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteFecha(programacionId, token);
        this.loadProgramacions();
        localStorage.setItem('programacionDeleted', 'true');
        this.checkForNotifications();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  downloadAsExcel() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const repetitiveCols = this.repetitiveColumns.filter(col => col.selected);
    const wsData = this.programacions.map(programacion => {
      const row: { [key: string]: any } = selectedColumns.reduce((acc, col) => ({ ...acc, [col.displayName]: programacion[col.name as keyof Programacion] }), {});
      programacion.diaHorarioDTOS.slice(0, 4).forEach((horario: DiaHorarioDTO, index: number) => {
        repetitiveCols.forEach(col => {
          if (col.name === 'horario') {
            row[`${col.displayName} ${index + 1}`] = `${horario.horaInicio} - ${horario.horaFin}`;
          } else if (col.name === 'aula') {
            row[`${col.displayName} ${index + 1}`] = `${horario.modulo} ${horario.aula}`;
          } else {
            row[`${col.displayName} ${index + 1}`] = horario[col.name as keyof DiaHorarioDTO];
          }
        });
      });
      return row;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(wsData);
    ws['!cols'] = [
      { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, // Ajusta el ancho de las columnas seleccionadas
      { wch: 15 }, { wch: 30 }, { wch: 30 }, { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 30 }, { wch: 20 } // Ajusta el ancho de las columnas repetitivas
    ];
    ws['!pageSetup'] = { orientation: "landscape" };

    const wb: XLSX.WorkBook = { Sheets: { 'Programacions': ws }, SheetNames: ['Programacions'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'programacions.xlsx');
  }

  downloadAsPDF() {
    const selectedColumns = this.columns.filter(col => col.selected);
    const repetitiveCols = this.repetitiveColumns.filter(col => col.selected);
    const doc = new jsPDF({ orientation: 'landscape' });
    (doc as any).autoTable({
      head: [
        [
          ...selectedColumns.map(col => col.displayName),
          ...Array(4).fill('').flatMap((_, index) =>
            repetitiveCols.map(col => `${col.displayName} ${index + 1}`)
          )
        ]
      ],
      body: this.programacions.map(programacion => {
        const row = selectedColumns.map(col => programacion[col.name as keyof Programacion]);
        programacion.diaHorarioDTOS.slice(0, 4).forEach((horario: DiaHorarioDTO) => {
          repetitiveCols.forEach(col => {
            if (col.name === 'horario') {
              row.push(`${horario.horaInicio} - ${horario.horaFin}`);
            } else if (col.name === 'aula') {
              row.push(`${horario.modulo} ${horario.aula}`);
            } else {
              row.push(horario[col.name as keyof DiaHorarioDTO]);
            }
          });
        });
        return row;
      }),
      styles: { fontSize: 8 }, // Ajusta el tamaño de la fuente si es necesario
      theme: 'grid',
      margin: { top: 10 }
    });
    doc.save('ProgramacionsReport.pdf');
  }
}
