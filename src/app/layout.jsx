import { Inter } from "next/font/google";
import NavbarVertical from "@/components/NavbarVertical";
import { UserSessionProvider } from "./context/UserSessionContext";
import "tailwindcss/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventum",
  description: "Event management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex h-screen`}>
        <UserSessionProvider>
          {/* Contenedor principal que contiene el Navbar y el contenido */}
          <div className="flex w-full h-full overflow-hidden">
            <NavbarVertical /> {/* NavbarVertical alineado a la izquierda */}
            {/* Contenedor para el contenido principal */}
            <div className="flex flex-col flex-1 overflow-auto">
              <main className="flex-1 p-4">
                {children}
              </main>
            </div>
          </div>
        </UserSessionProvider>
      </body>
    </html>
  );
}
