"use client"
import withAuth from "@/utils/withAuth";
import InsertarInvitados from "@/components/invitados/InsertarInvitados";
import Link from "next/link";

function crear_invitados({ params }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-start mb-4">
        <Link href={`/eventos/${params.id}/invitados`} passHref>
          <button className="px-4 py-2 bg-green-700 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
            Volver a la lista de invitados
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <InsertarInvitados eventoID={params.id} />
      </div>
    </div>
  );
}

export default withAuth(crear_invitados)