"use client";
import { useState } from "react";
import withAuth from "@/utils/withAuth";
import MostrarInvitados from "@/components/invitados/Mostrarinvitados";
import Link from "next/link";
import SendInvitationsButton from "@/components/invitados/SendInvitationsButton";
import Tabs from "@/components/invitados/Tabs";
import UploadFile from "@/components/invitados/UploadFile";

function Invitados({ params }) {
  const [filter, setFilter] = useState("pendiente");
  const [searchQuery, setSearchQuery] = useState("");

  if (!params) {
    return <div className="text-center">Cargando...</div>;
  }

  const handleFilterChange = (status) => {
    setFilter(status);
    setSearchQuery(""); // Clear search query when changing filters
  };

  return (
    <div className="p-6 min-h-screen sm:p-4">
      <div className="mb-12 text-left">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
          Lista de Invitados
        </h1>
        <span className="text-violeta text-2xl sm:text-4xl mt-2 sm:mt-10 block">
          Invitados para el Evento
        </span>
        <p className="text-lg text-gray-700 mt-2 sm:mt-4">
          Aquí puedes gestionar todos los invitados para el evento. Crea, edita
          y envía invitaciones fácilmente.
        </p>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start">
        <SendInvitationsButton eventId={params.id} className='h-12 w-full sm:w-44' />

        <Link href={`/eventos/${params.id}/invitados/crear_invitados`} passHref>
          <button className="cursor-pointer w-full sm:w-44 h-12 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg group active:w-11 active:h-11 active:rounded-full active:duration-300 ease-in-out">
            <svg
              className="animate-spin hidden group-active:block mx-auto"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1792 0.129353C10.6088 0.646711 8.22715 1.74444 6.16886 3.36616C4.13416 4.96799 2.42959 7.14686 1.38865 9.48493C0.202866 12.1414 -0.241805 15.156 0.125386 18.0413C0.684593 22.4156 3.02922 26.3721 6.63375 29.0186C8.01155 30.0301 9.65549 30.8757 11.2725 31.3997C12.0405 31.6518 13.4857 32 13.7518 32H13.8361V30.7232V29.4464L13.762 29.4331C11.8485 29.0252 10.2787 28.3818 8.7493 27.3802C7.50961 26.5644 6.29688 25.4402 5.40416 24.2794C3.88824 22.3095 2.98206 20.0908 2.66203 17.5736C2.57781 16.8905 2.57781 15.1029 2.66203 14.4396C2.88773 12.7317 3.31556 11.3288 4.06678 9.863C5.88589 6.3045 9.23103 3.67791 13.1286 2.746C13.4352 2.67303 13.7182 2.60671 13.762 2.59676L13.8361 2.58349V1.29009C13.8361 0.577066 13.8327 -0.00330353 13.8293 1.33514e-05C13.8226 1.33514e-05 13.5329 0.0597076 13.1792 0.129353Z"
                fill="white"
              ></path>
              <path
                d="M19.563 1.38627V2.67967L19.7078 2.71615C20.8768 3.01463 21.7527 3.32968 22.6723 3.78071C24.8249 4.84528 26.6878 6.467 28.042 8.47011C29.248 10.251 29.9858 12.2375 30.2654 14.4562C30.3126 14.831 30.326 15.1792 30.326 16.0149C30.326 17.169 30.2923 17.5869 30.1205 18.5022C29.7365 20.575 28.8404 22.5681 27.5266 24.2761C26.8158 25.2014 25.8019 26.2029 24.862 26.9027C23.3056 28.0634 21.7324 28.7997 19.7078 29.3137L19.563 29.3502V30.6436V31.9403L19.691 31.9204C20.0616 31.8541 21.1362 31.5689 21.6516 31.4031C24.8216 30.365 27.6041 28.3951 29.6152 25.7652C30.2789 24.8996 30.7337 24.1667 31.2356 23.1618C31.8959 21.8419 32.3102 20.6479 32.5999 19.2318C33.4354 15.1394 32.6606 10.9441 30.417 7.40886C28.4126 4.24833 25.3067 1.8373 21.692 0.640079C21.1867 0.470943 20.038 0.169149 19.7078 0.112772L19.563 0.0895557V1.38627Z"
                fill="white"
              ></path>
            </svg>
            <span className="group-active:hidden">Añadir Invitado</span>
          </button>
        </Link>

        <UploadFile eventId={params.id} className='h-12 w-full sm:w-44' />
      </div>

      <Tabs activeTab={filter} onTabChange={handleFilterChange} />

      <div className="mb-4 w-full sm:w-80">
        <input
          type="text"
          placeholder="Buscar invitados..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-4 rounded bg-gray-300/40 text-gray-900"
        />
      </div>

      <MostrarInvitados
        eventoID={params.id}
        filter={filter}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default withAuth(Invitados);
