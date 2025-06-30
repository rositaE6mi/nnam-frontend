// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model'; // Importe l'interface User

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserById(idUtilisateur: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${idUtilisateur}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, userData);
  }

  updateUser(idUtilisateur: number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${idUtilisateur}`, userData);
  }

  deleteUser(idUtilisateur: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${idUtilisateur}`);
  }
}