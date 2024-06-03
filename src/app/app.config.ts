import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import mapboxgl from 'mapbox-gl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    GoogleMapsModule,
  ]
};

