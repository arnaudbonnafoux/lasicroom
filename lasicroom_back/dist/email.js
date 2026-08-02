"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT) : 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
async function envoyerEmailReservation(destinataire, details) {
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
exports.default = envoyerEmailReservation;
//# sourceMappingURL=email.js.map