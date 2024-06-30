"use client"
import withAuth from "@/utils/withAuth";
import FormularioEvento from "@/components/eventos/FormularioEvento";

function CrearEvento() {

  return (

    <FormularioEvento/>
  );
}

export default withAuth(CrearEvento);


