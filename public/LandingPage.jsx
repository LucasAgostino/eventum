import Link from "next/link"


export default function Component() {
  
  return (
    <div className="bg-gradient-to-b from-black to-blue-900 min-h-screen">
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-b from-black opacity-80">
          <Link href="" className="flex items-center justify-center" prefetch={false}>
            <img src='/Logo_Eventum_Navbar.png' className="h-14 " alt="Eventum Navbar Logo" />

            <span className="sr-only">Eventum</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-blue-300" prefetch={false}>
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-blue-300" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-blue-300" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-blue-300" prefetch={false}>
              Contact 
            </Link>
          </nav>
        </header>
        <main className="">
          <section className="w-full py-12 md:py-10 lg:py-20 xl:py-30 ">
            <div className="container px-4 md:px-6 ">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] ">
                <div className="flex flex-col justify-center space-y-4 lg:col-start-1 ">
                  <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                      <img src='/Logo_Eventum_Title.png' className="h-25 animate-fadeOutDown" alt="Eventum Title Logo" />
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 ml-16">
                      Effortlessly plan and manage your events with our all-in-one platform.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row ml-16">
                    <button 
                      href='/login'  class="overflow-hidden relative w-32 p-2 h-12 opacity-50 text-white  rounded-md text-xl font-bold cursor-pointer relative z-10 group border"
                    >
                      Sign In
                      <span
                        class="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
                      ></span>
                      <span
                        class="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
                      ></span>
                      <span
                        class="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
                      ></span>
                      <span
                        class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10 text-white"
                        >Sign In</span>
                    </button>
                    
                  </div>
                </div>
                <img
                  src="/Title.jpg"
                  className="lg:col-start-2 lg:col-end-3 justify-self-end rounded-2xl shadow-2xl animate-fadeOut mb-60"
                  style={{ height: '400px' , width: '600px' }} // Adjust the value as needed
                  alt="Image Title"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
              <div className="space-y-4 text-center max-w-[900px] mx-auto">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Plan and manage your events with ease
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Eventum provides a comprehensive set of tools to help you plan, organize, and manage your events
                  seamlessly.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li className="flex flex-col ">
                      <div className="flex items-center mr-4"> {/* Contenedor flex con margen a la derecha */}
                        <img src='/Icono_Evento.png' className="mr-2 h-10" /> {/* La clase 'mr-2' añade un margen a la derecha */}
                        <h3 className="text-xl font-bold">Event Planning</h3>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Easily create and manage event with our intuitive
                          event-planning tools.
                        </p>
                      </div>
                    </li>
                    <li className="flex flex-col ">
                      <div className="flex items-center mr-4"> {/* Contenedor flex con margen a la derecha */}
                        <img src='/Icono_Alerta.png' className="mr-2 h-10 " /> {/* La clase 'mr-2' añade un margen a la derecha */}
                        <h3 className="text-xl font-bold">Event Promotion</h3>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-gray-500 dark:text-gray-400 ">
                          Reach a wider audience and boost attendance with our 
                          event-promotion features.
                        </p>
                      </div>
                    </li>
                    <li className="flex flex-col ">
                      <div className="flex items-center mr-4"> {/* Contenedor flex con margen a la derecha */}
                        <img src='/Icono_Documento.png' className="mr-2 h-10" /> {/* La clase 'mr-2' añade un margen a la derecha */}
                        <h3 className="text-xl font-bold">Event Management</h3>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Streamline your event management with our powerful tools and analytics.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <img
                  src="/Body.jpg"
                  width="600"
                  height="360"
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full lg:order-last ml-10 mt-10 shadow-2xl animate-fadeOut"
                />
              </div>
            </div>
          </section>
          <section class="w-full py-12 md:py-24 lg:py-32 screen  ">
            <div class="container grid items-center justify-center gap-4 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <div class="space-y-2">
                <h2 class="text-3xl text-white font-bold tracking-tighter md:text-4xl/tight ml-14">What our users say about Eventum</h2>
                  <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Hear from our satisfied customers and see how Eventum has helped them plan and manage their events.
                  </p>
              </div>
              <div class="grid gap-6">
                <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 shadow-2xl">
                  <div class="flex items-start space-x-4">
                    <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                        <img src='/circulo-de-usuario.png' alt=''></img>
                      </span>
                        </span>
                        <div>
                          <p class="text-lg font-medium">"Eventum has been a game-changer for my event planning 
                          business."</p>
                          <p class="mt-2 text-gray-500 dark:text-gray-400">- Jane Doe, Event Planner</p>
                        </div>
                  </div>
                </div>
                <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 shadow-2xl">
                  <div class="flex items-start space-x-4">
                    <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <img src='/circulo-de-usuario.png' alt=''></img>
                    </span>
                    </span>
                    <div>
                      <p class="text-lg font-medium">
                        "Eventum's features have saved me so much time and effort in organizing my events."
                      </p>
                      <p class="mt-2 text-gray-500 dark:text-gray-400">- John Brock, Conference Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class=" relative ">
            <div class='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b to-black opacity-50 z-0 '>
              <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative z-10 ">
                <div class="space-y-3">
                  <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white opacity">Ready to plan your next event?</h2>
                    <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Sign up for Eventum and start planning your events today.
                    </p>
                </div>
                <div class="mx-auto w-full max-w-sm space-y-2 ">
                  <button
                      class="overflow-hidden relative w-32 p-2 h-12 bg-black text-white  rounded-md text-l font-bold cursor-pointer relative z-10 group border"
                    >
                      Sign Up
                      <span
                        class="absolute w-36 h-32 -top-8 -left-2 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
                      ></span>
                      <span
                        class="absolute w-36 h-32 -top-8 -left-2 bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
                      ></span>
                      <span
                        class="absolute w-36 h-32 -top-8 -left-2 bg-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
                      ></span>
                      <span
                        class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-3 left-8 z-10 text-white"
                        >Sign Up</span>
                    </button>
                </div>
              </div>
              </div>
          </section>
          {/* More sections go here */}
        </main>
  
      </div>
    </div>
  )
}

