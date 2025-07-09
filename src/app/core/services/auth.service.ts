import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Client, Agriculteur } from '../models/user-register.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Définir le type d'utilisateur dans le localStorage
  setUserType(type: 'CLIENT' | 'AGRICULTEUR' | 'ADMIN'): void {
    localStorage.setItem('userType', type);
  }

  // ✅ Obtenir le type d'utilisateur depuis le localStorage
  getUserType(): 'CLIENT' | 'AGRICULTEUR' | 'ADMIN' | null {
    const type = localStorage.getItem('userType');
    if (type === 'CLIENT' || type === 'AGRICULTEUR' || type === 'ADMIN') {
      return type;
    }
    return null;
  }

  // ✅ Méthodes pour vérifier le type d'utilisateur
  isClient(): boolean {
    return this.getUserType() === 'CLIENT';
  }

  isAgriculteur(): boolean {
    return this.getUserType() === 'AGRICULTEUR';
  }

  isAdmin(): boolean {
    return this.getUserType() === 'ADMIN';
  }

  isAdminOrAgriculteur(): boolean {
    const type = this.getUserType();
    return type === 'ADMIN' || type === 'AGRICULTEUR';
  }

  isAuthenticated(): boolean {
    return this.getUserType() !== null;
  }

  // ✅ Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']); // adapte selon ta route de login
  }

  // ✅ Connexion administrateur
  loginAdmin(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };
    return this.http.post(`${this.apiUrl}/admin/login`, body);
  }

  // ✅ Enregistrement client avec redirection et notification
  registerClient(data: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients/register`, data).pipe(
      tap(() => {
        // Affiche une notification de succès
        alert('Compte client créé avec succès. Vous pouvez maintenant vous connecter.');
        // Redirige vers la page d'accueil
        this.router.navigate(['/']);
      })
    );
  }

  // ✅ Enregistrement agriculteur avec redirection et notification
  registerAgriculteur(data: Agriculteur): Observable<any> {
    return this.http.post(`${this.apiUrl}/agriculteurs/register`, data).pipe(
      tap(() => {
        alert('Compte agriculteur créé avec succès. Vous pouvez maintenant vous connecter.');
        this.router.navigate(['/']);
      })
    );
  }

  getUserId(): number | null {
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.idUtilisateur || null;
  }
  return null;
}

}
