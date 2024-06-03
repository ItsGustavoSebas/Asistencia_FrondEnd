import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { GoogleMapsModule } from '@angular/google-maps';

declare var google: any;

@Component({
  selector: 'app-moduloscreate',
  standalone: true,
  imports: [FormsModule, CommonModule, GoogleMapsModule],
  templateUrl: './moduloscreate.component.html',
  styleUrls: ['./moduloscreate.component.css']
})
export class ModuloscreateComponent implements OnInit {
  formData: any = {
    name: '',
    aulas: '',
    facultad: '',
    latitud: '',
    longitud: ''
  };
  errorMessage: string = '';
  facultades: any[] = [];
  map!: google.maps.Map;
  marker!: google.maps.Marker;

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadFacultades();
    this.initMap();
  }

  async loadFacultades() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.showError('Token not found');
      return;
    }

    try {
      this.facultades = await this.userService.getAllFacultades(token);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -17.77638597534546, lng: -63.19518864154816 },
      zoom: 16,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.placeMarker(event.latLng);
    });
  }

  placeMarker(latLng: google.maps.LatLng | null): void {
    if (latLng) {
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
        });
      } else {
        this.marker.setPosition(latLng);
      }

      this.formData.latitud = latLng.lat();
      this.formData.longitud = latLng.lng();
    }
  }

  async handleSubmit() {
    console.log(this.formData)
    if (!this.formData.name || !this.formData.aulas || !this.formData.facultad || !this.formData.latitud || !this.formData.longitud) {
      this.showError('Por favor completa todos los campos.');
      return;
    }

    const confirmRegistration = confirm('Estas seguro que deseas crear este modulo?');
    if (!confirmRegistration) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const aulas = this.formData.aulas.split(',').map((item: string) => {
        item = item.trim();
        if (item.includes('-')) {
          const [start, end] = item.split('-').map(num => +num.trim());
          return Array.from({ length: end - start + 1 }, (_, i) => `Aula ${start + i}`);
        } else {
          return `Aula ${item}`;
        }
      }).flat();
      const newModuloData = {
        name: this.formData.name,
        facultad: {
          id: this.formData.facultad,
        },
        aulaNames: aulas,
        latitud: this.formData.latitud,
        longitud: this.formData.longitud,
      };
      console.log(newModuloData)

      const response = await this.userService.createModulo(newModuloData, token);
      console.log(response)
      if (response.statusCode === 200) {
        this.router.navigate(['/modulos']);
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
}
