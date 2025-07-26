export type Role = 'CLIENT' | 'AGRICULTEUR' | 'ADMIN';

export interface Utilisateur {
  idUtilisateur?: number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  dateNaissance: string;
  lieuNaissance: string;
  villeActuelle: string;
  quartier: string;
  boitePostale: string;
  email: string;
  motDePasse?: string;
  dateDeCreation?: string;
  dateDeModification?: string;
  statut?: boolean;
  role: Role;
}

export interface Client extends Utilisateur {
  role: 'CLIENT';
  adresseLivraison: string;
}

export interface Agriculteur extends Utilisateur {
  role: 'AGRICULTEUR';
  localisationFerme: string;
  superficie: number;
  cultures: string;
}

export interface Administrateur extends Utilisateur {
  role: 'ADMIN';
}


