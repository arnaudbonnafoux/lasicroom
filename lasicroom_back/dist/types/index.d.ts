export interface Artiste {
    id_artiste: number;
    nom_artiste: string;
    style_musical: string;
    description: string;
    photo: string | null;
    lien_video: string | null;
    date_creation: Date;
}
export interface ArtisteCreateRequest {
    nom_artiste: string;
    style_musical: string;
    description: string;
    lien_video?: string;
}
export interface ConcertRequest {
    titre: string;
    description: string;
    date_concert: string;
    nb_places_total: number;
    tarif_plein: number;
    tarif_reduit?: number;
}
export interface Utilisateur {
    id_utilisateur: number;
    nom: string;
    email: string;
    mot_de_passe: string;
    role: "user" | "admin";
    date_inscription: Date;
}
export interface ReservationRequest {
    id_concert: number;
    quantite: number;
}
export interface JWTPayload {
    id: number;
    email: string;
    role: string;
}
