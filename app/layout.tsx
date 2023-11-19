import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import SessionProvider from "./SessionProvider";
import HeaderContainer from "./components/header/HeaderContainer";
import ParticlesBackground from "./components/ParticlesBackground";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Horoscope",
  description:
    "Get insights into your daily horoscope and uncover your future.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} w-screen h-screen overflow-hidden`}>
        <Providers>
          <SessionProvider session={session}>
            <HeaderContainer />
            <main className="flex min-h-screen h-fit flex-col items-center pt- md:p-24 p-3 overflow-scroll">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
          </SessionProvider>
          {/* <ParticlesBackground /> */}
        </Providers>
      </body>
    </html>
  );
}
