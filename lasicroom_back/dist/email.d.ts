interface EmailDetails {
    nom: string;
    concert: string;
    places: number;
    [key: string]: any;
}
declare function envoyerEmailReservation(destinataire: string, details: EmailDetails): Promise<void>;
export default envoyerEmailReservation;
