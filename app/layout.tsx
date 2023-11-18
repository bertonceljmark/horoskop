import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import HeaderContainer from "./components/header/HeaderContainer";
import ParticlesBackground from "./components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Horoscope",
  description:
    "Get insights into your daily horoscope and uncover your future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} w-screen h-screen overflow-hidden`}>
        <ParticlesBackground />
        <HeaderContainer />
        <Providers>
          <main className="flex min-h-screen h-fit flex-col items-center pt- md:p-24 p-3 overflow-scroll">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
