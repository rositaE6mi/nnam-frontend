import { Produit } from "./produit.model";

export interface Categorie {
    idCat: number;
    nomCat: string;
    description: string;
    produits?: Produit[];
}
