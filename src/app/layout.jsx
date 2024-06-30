import { Inter } from "next/font/google";
import NavbarVertical from "@/components/NavbarVertical";
import { UserSessionProvider } from "./context/UserSessionContext";
import "tailwindcss/tailwind.css";
import Header from "@/components/Header";

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
          {/* Contenedor principal que contiene el Header, Navbar y el contenido */}
          <div className="flex flex-col w-full h-full overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <NavbarVertical />
              {/* Contenedor para el contenido principal */}
              <div className="flex flex-col flex-1 overflow-auto transition-all duration-300 ease-in-out">
                <main className="flex-1 p-4">{children}</main>
              </div>
            </div>
          </div>
        </UserSessionProvider>
      </body>
    </html>
  );
}
