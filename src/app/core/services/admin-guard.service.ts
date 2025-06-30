import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // L'utilisateur est un administrateur
    } 
    this.router.navigate(['/']); // Redirige si l'utilisateur n'est pas administrateur
    return false;
  }
}
