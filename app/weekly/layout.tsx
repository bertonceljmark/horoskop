import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Horoscope",
  description: "You can make your life decisions based on your weekly horoscope and star positions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}