// src/app/api/send-invitations/route.js
import { supabase } from '@/utils/supabase';
import transporter from '@/utils/nodemailer';

export async function POST(req, { params }) {
  const { eventId } = params;
  console.log(eventId);
  
  try {
    // Obtener la lista de invitados desde Supabase
    const { data: invitados, error } = await supabase.from('invitado').select('*').eq('eventoID', eventId).eq('estado','pendiente');
    console.log(invitados);

    if (error) {
      throw error;
    }

    // Enviar invitaciones a cada invitado
    for (const invitado of invitados) {
      const confirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm/${eventId}/${invitado.id}`;

      const mailOptions = {
        from: '"Eventum" <eventum.software@gmail.com>',
        to: invitado.email,
        subject: 'Invitación al Evento',
        html: `
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Invitación al Evento</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                      <td align="center">
                          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px;">
                              <!-- Header -->
                              <tr>
                                  <td align="center" style="background: linear-gradient(135deg, #4c6ef5, #3c58a1); padding: 20px;">
                                      <h1 style="margin: 0; color: white;">¡Estás Invitado!</h1>
                                      <p style="margin: 0; color: white;">Confirma tu asistencia al evento de Carlos</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" style="padding: 10px;">
                                      <img src="/Logo_Eventum_Title.png" alt="Eventum" style="width: 100px;">
                                  </td>
                              </tr>
                              <!-- Event Details -->
                              <tr>
                                  <td style="padding: 20px;">
                                      <h2 style="text-align: center; color: #000;">Cumple Carlitos Bala</h2>
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
                                          <tr>
                                              <td style="width: 50%; padding: 10px;">
                                                  <strong>Fecha</strong><br>
                                                  12 de junio, 2024
                                              </td>
                                              <td style="width: 50%; padding: 10px;">
                                                  <strong>Hora</strong><br>
                                                  7:00 PM - 10:00 PM
                                              </td>
                                          </tr>
                                          <tr>
                                              <td colspan="2" style="padding: 10px;">
                                                  <strong>Dirección:</strong><br>
                                                  Av. Libertador 2400, Olivos, Buenos Aires
                                              </td>
                                          </tr>
                                      </table>
                                      <p style="text-align: center;">
                                          Únete a nosotros para celebrar un evento especial. Será una ocasión única para compartir momentos maravillosos. Confirma tu asistencia a esta experiencia única.
                                      </p>
                                      <div style="text-align: center; margin: 20px 0;">
                                          <a href="${confirmationLink}" style="background-color: #000; color: white; padding: 10px 30px; text-decoration: none; display: inline-block;">Confirmar Asistencia</a>
                                      </div>
                                  </td>
                              </tr>
                              <!-- Footer -->
                              <tr>
                                  <td style="background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 12px; color: #555;">
                                      <p>Este es un correo electrónico generado automáticamente, por favor no respondas a este mensaje.</p>

                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          </html>
        `
      }

      await transporter.sendMail(mailOptions);

      await supabase.from('invitado').update({ estado: 'enviado' }).eq('id', invitado.id);

    }

    return new Response(JSON.stringify({ message: 'Invitaciones enviadas' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending invitations:', error);
    return new Response(JSON.stringify({ error: 'Error sending invitations' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
