"use client";
import withAuth from '@/app/utils/withAuth';
import MostrarInvitados from '@/components/Mostrarinvitados';
import Link from 'next/link';

function Invitados ({params}) {
  
  if (!params) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Invitados para el evento {params.id}</h1>
      <Link href={`/eventos/${params.id}/invitados/crear_invitados`}passHref><button>Crear Invitado</button></Link>
      <MostrarInvitados eventoID={params.id} />
    </div>
  );
};

export default withAuth(Invitados)