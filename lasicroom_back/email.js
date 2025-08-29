const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


async function envoyerEmailReservation(destinataire, details) {
  const mailOptions = {
    from: '"Salle de Concert" <no-reply@salleconcert.com>',
    to: destinataire,
    subject: 'Confirmation de réservation',
    text: `Merci pour votre réservation.\n\nDétails : ${JSON.stringify(details, null, 2)}`,
    html: `<h2>Merci pour votre réservation</h2>
           <p>Nom : ${details.nom}</p>
           <p>Concert : ${details.concert}</p>
           <p>Places : ${details.places}</p>`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = envoyerEmailReservation;