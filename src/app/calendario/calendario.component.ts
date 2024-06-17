import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  fechas: any[] = [];
  gestionId: any;
  errorMessage: string = '';
  searchName: string = '';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventColor: '',
    eventTextColor: 'black',
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    public readonly userService: UsersService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadfechas();
    this.checkForNotifications();
  }

  checkForNotifications() {
    const fechaCreated = localStorage.getItem('fechaCreated');
    if (fechaCreated) {
      this.toastr.success('Fecha creada correctamente');
      localStorage.removeItem('fechaCreated');
    }

    const fechaDeleted = localStorage.getItem('fechaDeleted');
    if (fechaDeleted) {
      this.toastr.success('Fecha eliminada correctamente');
      localStorage.removeItem('fechaDeleted');
    }

    const fechaUpdated = localStorage.getItem('fechaUpdated');
    if (fechaUpdated) {
      this.toastr.success('Fecha actualizada correctamente');
      localStorage.removeItem('fechaUpdated');
    }
  }

  async loadfechas() {
    try {
      const token: any = localStorage.getItem('token');
      this.gestionId = this.route.snapshot.paramMap.get('id');
      const response = await this.userService.getAllFechas(this.gestionId, token);
      if (response) {
        this.fechas = response.fechaImportantes;
        this.calendarOptions.events = this.fechas.map(fecha => ({
          id: fecha.id,
          title: fecha.descripcion,
          start: fecha.fechaInicio,
          end: fecha.fechaFin,
          backgroundColor: this.getEventColor(fecha.tipo.id),
          borderColor: this.getEventColor(fecha.tipo.id)
        }));
      } else {
        this.showError('No se encontraron fechas.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  getEventColor(tipoId: number): string {
    switch (tipoId) {
      case 1:
        return '#90EE90'; // Light Green
      case 2:
        return '#FFC0CB'; // Light Red
      case 3:
        return '#ADD8E6'; // Light Blue
      default:
        return '#FFFFFF'; // Default white
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; 
    }, 3000);
  }

  async deletefecha(fechaId: string) {
    const confirmDelete = confirm('¿Estás seguro que deseas eliminar esta fecha?');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteFecha(fechaId, token);
        this.loadfechas();
        localStorage.setItem('fechaDeleted', 'true');
        this.checkForNotifications();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  handleEventClick(info: any) {
    // Lógica para manejar clics en eventos
  }
}
