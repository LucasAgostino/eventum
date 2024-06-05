// src/app/api/send-invitations/route.js
import { supabase } from "@/utils/supabase";
import transporter from "@/utils/nodemailer";

export async function POST(req, { params }) {
  const { eventId } = params;
  console.log(eventId);

  try {
    // Obtener la lista de invitados desde Supabase
    const [invitadosResult, eventoResult] = await Promise.all([
      supabase
        .from("invitado")
        .select()
        .eq("eventoID", eventId)
        .eq("estado", "pendiente"),
      supabase.from("evento").select().eq("id", eventId),
    ]);

    // Manejar los errores
    if (invitadosResult.error) {
      throw invitadosResult.error;
    }
    if (eventoResult.error) {
      throw eventoResult.error;
    }

    const invitados = invitadosResult.data;
    const evento = eventoResult.data;

    console.log(invitados);
    console.log(evento);

    // Enviar invitaciones a cada invitado
    for (const invitado of invitados) {
      const confirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm/${eventId}/${invitado.id}`;
      const nombreEvento = `${evento[0].nombreEvento}`;
      const fecha = `${evento[0].fecha}`;
      const ubicacion = `${evento[0].ubicacion}`;

      const mailOptions = {
        from: '"Eventum" <eventum.software@gmail.com>',
        to: invitado.email,
        subject: "Invitación al Evento",
        html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitación al Evento</title>
            <style>
                .highlight {
                    background-color: #e3f2fd;
                    border-radius: 8px;
                    padding: 10px;
                    margin: 10px 0;
                    font-weight: bold;
                }
        
                .button {
                    background-color: #1565c0;
                    color: white !important;
                    padding: 15px 30px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 18px;
                    display: inline-block;
                }
                .button:hover {
                    background-color: #0d47a1;
                }
            </style>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 10px;">
                            <!-- Header -->
                            <tr>
                                <td align="center" style="background: linear-gradient(135deg, #4c6ef5, #3c58a1); padding: 10px;">
                                    <h1 style="margin: 0; color: white;">¡Estás Invitado!</h1>
                                    <h3 style="margin: 0; color: white;">Confirma tu asistencia a ${nombreEvento}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 5px;">
                                    <img src="https://drive.google.com/uc?export=view&id=1oLBLqI58XxerZ1sw5Kc5TEwoba89P3xT" alt="Eventum" style="width: 100px;">
                                </td>
                            </tr>
                            <!-- Event Details -->
                            <tr>
                                <td style="padding: 5px;">
                                    <h2 style="text-align: center; color: #000;">Detalles del Evento</h2>
                                    <div class="highlight" style="text-align: center;">
                                        <p><strong>Evento:</strong> ${nombreEvento}</p>
                                        <p><strong>Fecha:</strong> ${fecha}</p>
                                        <p><strong>Dirección:</strong> ${ubicacion}</p>
                                    </div>
                                    <p style="text-align: center;">
                                        Únete a nosotros para celebrar un evento especial. Será una ocasión única para compartir momentos maravillosos. Confirma tu asistencia a esta experiencia única.
                                    </p>
                                    <div style="text-align: center; margin: 20px 0;">
                                        <a href="${confirmationLink}" class="button">Confirmar Asistencia</a>
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

        `,
      };

      await transporter.sendMail(mailOptions);

      await supabase
        .from("invitado")
        .update({ estado: "enviado" })
        .eq("id", invitado.id);
    }

    return new Response(JSON.stringify({ message: "Invitaciones enviadas" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sending invitations:", error);
    return new Response(
      JSON.stringify({ error: "Error sending invitations" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
