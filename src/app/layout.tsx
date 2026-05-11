import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SupportButton } from "@/components/SupportButton";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "PandaDrop",
  description: "Warm panda-style case opening frontend",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={nunito.variable}>
        {children}
        <SupportButton />
      </body>
    </html>
  );
}
