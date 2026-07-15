import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth";

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private router: Router, private authService: AuthService) {}

  get username(): string | null {
    return this.authService.getUsername();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
