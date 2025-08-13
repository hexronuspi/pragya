import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/global.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "nDNA - nDNA",
  description: "",
  icons: {
    icon: "/pragya/nDNA_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}
      </body>
    </html>
  );
}