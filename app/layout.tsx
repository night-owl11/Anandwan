import type { Metadata } from "next";
import { Playfair_Display, Lora, Courier_Prime } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif', weight: ['400', '700'] });
const lora = Lora({ subsets: ["latin"], variable: '--font-body', weight: ['400', '600'] });
const courier = Courier_Prime({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-typewriter' });

export const metadata: Metadata = {
  title: "Anandwan - Stories That Must Be Told",
  description: "A living archive of human resilience, transformation, and hope from Anandwan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lora.variable} ${courier.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
