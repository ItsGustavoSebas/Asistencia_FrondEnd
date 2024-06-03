import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-modulosupdate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modulosupdate.component.html',
  styleUrls: ['./modulosupdate.component.css']
})
export class ModulosupdateComponent implements OnInit {
  @ViewChild('aulasInput') aulasInput!: ElementRef;
  moduloData: any = {};
  errorMessage: string = '';
  facultades: any[] = [];
  moduloId: any;
  map!: google.maps.Map;
  marker!: google.maps.Marker;

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadFacultades();
    this.loadModuleData();
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

  async loadModuleData() {
    this.moduloId = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token');
    if (!this.moduloId || !token) {
      this.showError('User ID or Token is Required');
      return;
    }

    try {
      let moduloDataResponse = await this.userService.getmodulosById(this.moduloId, token);
      const { name, latitud, longitud, facultad, aulas } = moduloDataResponse;
      this.moduloData = { name, latitud, longitud, facultad, aulas };
      this.initMap(this.moduloData.latitud, this.moduloData.longitud);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  initMap(lat: number, lng: number): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat, lng },
      zoom: 17,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
    });

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

      this.moduloData.latitud = latLng.lat();
      this.moduloData.longitud = latLng.lng();
    }
  }

  async updateModulo() {
    console.log(this.moduloData)
    console.log(this.aulasInput.nativeElement.value)
    if (!this.moduloData.name) {
      this.showError('Por favor completa todos los campos requeridos.');
      return;
    }
    const confirmUpdate = confirm('¿Estás seguro de que quieres actualizar este modulo?');
    if (!confirmUpdate) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const aulas = this.aulasInput.nativeElement.value.split(',').map((item: string) => {
        item = item.trim();
        if (item.includes('-')) {
          const [start, end] = item.split('-').map(num => +num.trim());
          return Array.from({ length: end - start + 1 }, (_, i) => `Aula ${start + i}`);
        } else {
          return `Aula ${item}`;
        }
      }).flat();
      
      const newModuloData = {
        name: this.moduloData.name,
        facultad: {
          id: this.moduloData.facultad.id,
        },
        aulaNames: aulas,
        latitud: this.moduloData.latitud,
        longitud: this.moduloData.longitud,
      };
      console.log(newModuloData)

      const res = await this.userService.updatemodulo(this.moduloId, newModuloData, token);
      console.log(res);

      if (res.statusCode === 200) {
        this.router.navigate(['/modulos']);
      } else {
        this.showError(res.message);
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

  formatAulas(aulas: any[]): string {
    const formattedAulas = [];
    let start = null;
    let end = null;
    for (let i = 0; i < aulas.length; i++) {
      if (start === null) {
        start = aulas[i].name.split(' ')[1]; 
      }
      if (i === aulas.length - 1 || +aulas[i + 1].name.split(' ')[1] !== +aulas[i].name.split(' ')[1] + 1) {
        end = aulas[i].name.split(' ')[1]; 
        formattedAulas.push(`${start}-${end}`);
        start = null;
        end = null;
      }
    }
    return formattedAulas.join(', ');
  }
}
