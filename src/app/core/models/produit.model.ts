import { Stock } from './stock.model';

export interface Produit {
  idProduit: number;
  nomProduit: string;
  description: string;
  prixU: number;
  dateExpiration: string;
  categorieId: number; // ✅ Correction ici
  stock: {
    nom: string;
    quantiteStock: number;
  }
 imageUrl?: string;

}

