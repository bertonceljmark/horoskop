import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Horoscope",
  description: "Horoscope goes brrrrrrrrrrrr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
