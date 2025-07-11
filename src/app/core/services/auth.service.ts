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

  // Définir le type d'utilisateur dans le localStorage
  setUserType(type: 'CLIENT' | 'AGRICULTEUR' | 'ADMIN'): void {
    localStorage.setItem('userType', type);
  }

  // Obtenir le type d'utilisateur depuis le localStorage
  getUserType(): 'CLIENT' | 'AGRICULTEUR' | 'ADMIN' | null {
    const type = localStorage.getItem('userType');
    if (type === 'CLIENT' || type === 'AGRICULTEUR' || type === 'ADMIN') {
      return type;
    }
    return null;
  }

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

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }

  // Connexion administrateur
  loginAdmin(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };
    return this.http.post(`${this.apiUrl}/admin/login`, body);
  }

  // Enregistrement client
 registerClient(data: Client): Observable<any> {
  const payload = {
    idUtilisateur: 0,
    nomUtilisateur: data.nomUtilisateur,
    prenomUtilisateur: data.prenomUtilisateur,
    dateNaissance: data.dateNaissance,
    lieuNaissance: data.lieuNaissance,
    villeActuelle: data.villeActuelle,
    quartier: data.quartier,
    boitePostale: data.boitePostale,
    email: data.email,
    statut: true,
    motDePasse: data.motDePasse,
    idRole: 3 // ⚠️ ID du rôle "CLIENT" dans ta BDD
  };

  console.log('Payload client:', payload);

  return this.http.post(`${this.apiUrl}/utilisateur/add`, payload).pipe(
    tap(() => {
      alert('Compte client créé avec succès. Vous pouvez maintenant vous connecter.');
      this.router.navigate(['/']);
    })
  );
}


  // Enregistrement agriculteur : stocke les données spécifiques localement
  // et envoie uniquement les données communes au backend
  registerAgriculteur(data: Agriculteur): Observable<any> {
  // Construis un payload qui correspond EXACTEMENT au JSON attendu par ton backend
  const payload = {
    idUtilisateur: 0,
    nomUtilisateur: data.nomUtilisateur,
    prenomUtilisateur: data.prenomUtilisateur,
    dateNaissance: data.dateNaissance,
    lieuNaissance: data.lieuNaissance,
    villeActuelle: data.villeActuelle,
    quartier: data.quartier,
    boitePostale: data.boitePostale,
    email: data.email,
    statut: true, // par défaut actif, adapte si besoin
    motDePasse: data.motDePasse,
    idRole: 2 // ⚠️ ID du rôle "AGRICULTEUR" dans ta BDD (remplace 2 par la vraie valeur)
  };

  console.log('Payload envoyé à l’API:', payload);

  return this.http.post(`${this.apiUrl}/utilisateur/add`, payload).pipe(
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
login(email: string, motDePasse: string): Observable<string> {
  return this.http.post(`${this.apiUrl}/utilisateur/login`, null, {
    params: { email, motDePasse },
    responseType: 'text'
  });
}



}

