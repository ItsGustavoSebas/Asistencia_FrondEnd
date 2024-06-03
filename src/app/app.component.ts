import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent, FooterComponent, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users-management-angular';
}
