// role.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role } from '../models/role.model'; // Importe l'interface Role

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles`, role);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  getRoleById(idRole: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/roles/${idRole}`);
  }

  updateRole(idRole: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/roles/${idRole}`, role);
  }

  deleteRole(idRole: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/roles/${idRole}`);
  }
}