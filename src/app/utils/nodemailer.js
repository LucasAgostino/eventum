// src/utils/nodemailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Cambia esto al host SMTP que estés usando
  port: 465, // o 465 dependiendo del servicio SMTP
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER, // Tu usuario SMTP
    pass: process.env.SMTP_PASS, // Tu contraseña SMTP
  },
  tls: {
    rejectUnauthorized: false, // Añadir esta línea
  },
});

export default transporter;
