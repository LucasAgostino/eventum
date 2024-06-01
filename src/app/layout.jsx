import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
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
      <body className={inter.className}>
        <UserSessionProvider>
          <header>
            <Navbar />
          </header>
          {children}
        </UserSessionProvider>
      </body>
    </html>
  );
}
