import { Inter } from "next/font/google";
import NavbarVertical from "@/components/NavbarVertical";
import { UserSessionProvider } from "./context/UserSessionContext";
import "tailwindcss/tailwind.css";
import Header from "@/components/header";

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
          <NavbarVertical /> {/* NavbarVertical alineado a la izquierda */}
          <main className="flex-1">{children}</main>
        </UserSessionProvider>
      </body>
    </html>
  );
}
