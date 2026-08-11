import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailDetails {
  nom: string;
  concert: string;
  places: number;
  [key: string]: any;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function envoyerEmailReservation(
  destinataire: string,
  details: EmailDetails,
): Promise<void> {
  const mailOptions = {
    from: '"Salle de Concert" <no-reply@salleconcert.com>',
    to: destinataire,
    subject: "Confirmation de réservation",
    text: `Merci pour votre réservation.\n\nDétails : ${JSON.stringify(details, null, 2)}`,
    html: `<h2>Merci pour votre réservation</h2>
           <p>Nom : ${details.nom}</p>
           <p>Concert : ${details.concert}</p>
           <p>Places : ${details.places}</p>`,
  };

  await transporter.sendMail(mailOptions);
}

export default envoyerEmailReservation;
