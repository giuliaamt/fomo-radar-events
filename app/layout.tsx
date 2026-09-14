import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cinematografica = localFont({
  src: "../public/fonts/cinematografica.extrabold.ttf",
  display: "swap",
  variable: "--font-cinematografica",
});

export const metadata: Metadata = {
  title: "FOMO RADAR",
  description: "Eventi culturali da non perdere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={cinematografica.variable}>
    <head>
      <link rel="stylesheet" href="https://use.typekit.net/xti7sgp.css" />
    </head>

    <body>{children}</body>
    </html>
  );
}
