import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AfriDigital | Agence Technologique Premium en Côte d'Ivoire",
  description: "Solutions web, applications mobiles, ERP sur mesure et infrastructures informatiques haute performance. Basé à Abidjan.",
  metadataBase: new URL("https://afridigital.ci"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0D0D0D] text-white antialiased selection:bg-primary selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
