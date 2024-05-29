"use client";
import MostrarInvitados from '@/components/Mostrarinvitados';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Invitados = () => {
  const pathname = usePathname();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/');
      const eventId = pathSegments[pathSegments.length - 2]; // Asumiendo que el formato es /eventos/[id]/invitados
      setId(eventId);
    }
  }, [pathname]);

  if (!id) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Invitados para el evento {id}</h1>
      <MostrarInvitados eventoID={id} />
    </div>
  );
};

export default Invitados;
