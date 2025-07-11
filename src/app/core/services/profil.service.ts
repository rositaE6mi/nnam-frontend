import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private apiUrl = `${environment.apiUrl}/profils`; // adapte selon ton backend

  constructor(private http: HttpClient) { }

  getProfilById(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/${id}`);
  }

  getProfilByUserId(userId: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/utilisateur/${userId}`);
  }

  updateProfil(profil: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.apiUrl}/${profil.idProfil}`, profil);
  }

  deleteProfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
