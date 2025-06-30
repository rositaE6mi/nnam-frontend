import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { RegisterClient, RegisterAgriculteur } from '../models/user-register.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private adminCredentials = { username: 'admin', password: 'password' };

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour définir le type d'utilisateur dans le localStorage
  setUserType(type: 'client' | 'agriculteur' | 'admin') {
    localStorage.setItem('userType', type);
  }

  // Méthode pour obtenir le type d'utilisateur depuis le localStorage
  getUserType(): 'client' | 'agriculteur' | 'admin' | null {
    return localStorage.getItem('userType') as 'client' | 'agriculteur' | 'admin' | null;
  }

  // Méthodes pour vérifier le type d'utilisateur
  isClient(): boolean {
    return this.getUserType() === 'client';
  }

  isAgriculteur(): boolean {
    return this.getUserType() === 'agriculteur';
  }

  isAdmin(): boolean {
    return this.getUserType() === 'admin';
  }

  isAdminOrAgriculteur(): boolean {
    const type = this.getUserType();
    return type === 'admin' || type === 'agriculteur';
  }

  isAuthenticated(): boolean {
    return this.getUserType() !== null;
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }

  // Méthode pour la connexion de l'administrateur
  loginAdmin(email: string, motDePasse: string): Observable<any> {
    const queryParams = new URLSearchParams();
    queryParams.set('email', email);
    queryParams.set('motDePasse', motDePasse);
    const url = `${this.apiUrl}/utilisateur/login-admin?${queryParams.toString()}`;
    return this.http.post<any>(url, {});
  }

  // Méthodes pour l'enregistrement
  registerClient(data: RegisterClient): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register-client`, data);
  }

  registerAgriculteur(data: RegisterAgriculteur): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register-agriculteur`, data);
  }
}