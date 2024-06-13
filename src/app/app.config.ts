import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import mapboxgl from 'mapbox-gl';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    GoogleMapsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule, // Añade esto
    importProvidersFrom(ToastrModule.forRoot({
      timeOut: 3000, // 15 seconds
    closeButton: true,
    progressBar: true,
    })),
  ]
};

