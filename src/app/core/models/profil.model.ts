export interface Profil {
  idProfil?: number;
  nomProfil: string;
  zoneGeographique: string;
    photoUrl?: string; // chemin ou URL de la photo
  utilisateurId?: number; // ou directement l'objet Utilisateur si tu souhaites lier
}
