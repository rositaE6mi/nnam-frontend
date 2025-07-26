import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProduitReqDTO } from '../models/produit-req-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  constructor(private httpClient: HttpClient) {}
  

  getAllProduits(): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`${environment.apiUrl}/produits/get_all`);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.httpClient.get<Produit>(`${environment.apiUrl}/produits/get/${id}`);
  }

  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.httpClient.post<Produit>(`${environment.apiUrl}/produits/add`, produit);
  }

  modifierProduit(produit: Produit): Observable<Produit> {
    return this.httpClient.put<Produit>(`${environment.apiUrl}/produits/update/${produit.idProduit}`, produit);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/produits/delete/${id}`);
  }

  getProduitsParNomCategorie(nomCategorie: string): Observable<Produit[]> {
    return this.httpClient.get<Produit[]>(`${environment.apiUrl}/categorie/nom/${nomCategorie}`);
  }

  getProduitsPhares(): Observable<Produit[]> {
  return this.httpClient.get<Produit[]>(`${environment.apiUrl}/produits/phares`);
}
ajouterProduitAvecImage(formData: FormData) {
  return this.httpClient.post<Produit>(`${environment.apiUrl}/produits/add`, formData);
}


}
