// src/app/core/models/produit-req-dto.model.ts

export interface ProduitReqDTO {
  nomProduit: string;
  description: string;
  prixU: number;
  dateExpiration: string;
  categorieId: number;
  stock: {
    nom: string;
    quantiteStock: number;
  };
}
