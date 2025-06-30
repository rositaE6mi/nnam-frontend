import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private items: number[] = []; // ✅ liste des IDs de produits
  private itemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getItemCount(): Observable<number> {
    return this.itemCount.asObservable();
  }

  ajouterProduit(id: number, qte: number = 1): void {
    for (let i = 0; i < qte; i++) {
      this.items.push(id);
    }
    this.itemCount.next(this.items.length);
  }

  getProduits(): number[] {
    return [...this.items]; // retourne une copie sécurisée
  }

  viderPanier(): void {
    this.items = [];
    this.itemCount.next(0);
  }

  reset(): void {
    this.viderPanier(); // réinitialisation complète
  }

  retirerProduit(id: number, quantite: number): void {
  for (let i = 0; i < quantite; i++) {
    const index = this.items.indexOf(id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  this.itemCount.next(this.items.length);
}

}
