"use client";
import withAuth from '@/utils/withAuth';
import MostrarInvitados from '@/components/Mostrarinvitados';
import Link from 'next/link';
import SendInvitationsButton from '@/components/SendInvitationsButton';

function Invitados ({params}) {
  
  if (!params) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Invitados para el evento {params.id}</h1>
      <Link href={`/eventos/${params.id}/invitados/crear_invitados`}passHref><button>Crear Invitado</button></Link>
      <SendInvitationsButton eventId={params.id}/>
      <MostrarInvitados eventoID={params.id} />
    </div>
  );
};

export default withAuth(Invitados)