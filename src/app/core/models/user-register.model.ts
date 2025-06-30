export interface RegisterClient {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adresseLivraison: string;
}

export interface RegisterAgriculteur {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  localisationFerme: string;
  superficie: number;
  cultures: string;
}
