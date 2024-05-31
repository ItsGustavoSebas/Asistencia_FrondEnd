import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private readonly userService: UsersService){}
  open = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;


  ngOnInit(): void {
    this.userService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.isAdmin = this.userService.isAdmin();
      this.isUser = this.userService.isUser();
    });
  }

  logout(): void {
    this.userService.logOut();
  }

  toggleMenu() {
    this.open = !this.open;
  }
}
