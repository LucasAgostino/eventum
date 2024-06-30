import Link from "next/link";

export default function Landing() {
  return (
    <div className="bg-[#1B264F] min-h-screen flex items-center justify-center">
      <div className="flex flex-col min-h-screen w-full">
        <main className="w-full">
          <section className="w-full py-12 md:py-10 lg:py-20 xl:py-30">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_800px] lg:gap-12 xl:grid-cols-[1fr_800px]">
                <div className="flex flex-col justify-center space-y-4 lg:col-start-1">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                      <img src="/Logo_Eventum_Title.png" className="h-25 animate-fadeOutDown" alt="Eventum Title Logo" />
                    </h1>
                    <p className="max-w-[600px] text-gray-300 md:text-xl ml-16">
                      Planifica y gestiona tus eventos sin esfuerzo con nuestra plataforma todo en uno.</p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row ml-16">
                    <a href="/login">
                      <button
                        className="overflow-hidden w-50 p-2 h-12 opacity-50 text-white rounded-md text-xl font-bold cursor-pointer relative z-10 group border"
                      >
                        Inicia sesion
                        <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                        <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                        <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                        <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10 text-white">Inicia sesion</span>
                      </button>
                    </a>
                  </div>
                </div>
                <img src="/Register.png" className="ml-40" style={{ height: '800px', width: '800px' }} alt="Image Title" />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-10 lg:py-20 xl:py-30 bg-gray-100 items-center justify-center pl-10">
            <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Plan and manage your events with ease</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Eventum ofrece un conjunto completo de herramientas para ayudarte a planificar, organizar y gestionar tus eventos de manera fluida.                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li className="flex flex-col">
                      <div className="flex items-center mr-4">
                        <img src="/Icono_Evento.png" className="mr-2 h-10" alt="2" />
                        <h3 className="text-xl font-bold">Planificación de Eventos</h3>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-gray-500">Crea y gestiona eventos fácilmente con nuestras intuitivas herramientas de planificación de eventos.</p>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-center mr-4">
                        <img src="/Icono_Alerta.png" className="mr-2 h-10" alt="" />
                        <h3 className="text-xl font-bold">Promoción de Eventos</h3>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-gray-500">
                          Llega a una audiencia más amplia y aumenta la asistencia con nuestras funciones de promoción de eventos.
                        </p>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-center mr-4">
                        <img src="/Icono_Documento.png" className="mr-2 h-10" alt="3" />
                        <h3 className="text-xl font-bold">Gestión de Eventos</h3>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-gray-500">Optimiza la gestión de tus eventos con nuestras potentes herramientas y análisis.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <img src="/Login2.png" width="700" height="420" alt="Image" className="ml-40" />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 screen pl-10">
            <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-2">
                <h2 className="text-3xl text-white font-bold tracking-tighter md:text-4xl/tight ml-14">Lo que nuestros usuarios dicen sobre Eventum</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Escucha a nuestros clientes satisfechos y descubre cómo Eventum les ha ayudado a planificar y gestionar sus eventos.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                        <img src="/circulo-de-usuario.png" alt=""></img>
                      </span>
                    </span>
                    <div>
                      <p className="text-lg font-medium">Eventum has been a game-changer for my event planning business.</p>
                      <p className="mt-2 text-gray-500">- Jane Doe, Event Planner</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-2xl">
                  <div className="flex items-start space-x-4">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                        <img src="/circulo-de-usuario.png" alt=""></img>
                      </span>
                    </span>
                    <div>
                      <p className="text-lg font-medium">
                        Eventum s features have saved me so much time and effort in organizing my events.
                      </p>
                      <p className="mt-2 text-gray-500">- John Brock, Conference Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative pl-10">
            <div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b to-black opacity-50 z-0">
              <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative z-10">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white opacity">Ready to plan your next event?</h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Sign up for Eventum and start planning your events today.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <a href="/register">
                    <button
                      className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white rounded-md text-l font-bold cursor-pointer z-10 group border"
                    >
                      Sign Up
                      <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                      <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                      <span className="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                      <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-3 left-8 z-10 text-white">Sign Up</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* More sections go here */}
        </main>
      </div>
    </div>
  );
}