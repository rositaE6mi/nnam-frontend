// categorie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../models/categorie.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/get_all`);
  }

  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, cat);
  }

  modifierCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/${cat.idCat}`, cat);
  }

  supprimerCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategorieByNom(nom: string): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/nom/${nom}`);
  }

  searchCategories(query: string): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories/search?nomCat=${query}`);
  }
}