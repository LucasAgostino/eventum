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
        html: `<p>Has sido invitado a un evento. Confirma tu asistencia en el siguiente enlace:</p><a href="${confirmationLink}">Confirmar Asistencia</a>`,
      };

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
