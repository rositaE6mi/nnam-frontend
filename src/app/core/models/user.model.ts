// user.model.ts
export interface User {
  idUtilisateur: number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  dateNaissance: string;
  lieuNaissance: string;
  villeActuelle: string;
  quartier: string;
  boitePostale: string;
  email: string;
  motDePasse: string;
  statut: boolean;
  idRole: number;
  idProfil: number;
}