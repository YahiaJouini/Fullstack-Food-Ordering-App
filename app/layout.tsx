import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import SessionProvider from "@/app/utils/SessionProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ['300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider>
          <main className="max-w-7xl mx-auto p-4">
            <Header />
            {children}
            <footer className="border-t p-8 text-center mt-16 text-gray-500">
              &copy; 2024 All rights reserved
            </footer>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
