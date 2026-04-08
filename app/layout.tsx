import type { Metadata } from "next";
import { Playfair_Display, Lora, Courier_Prime } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif', weight: ['400', '700'] });
const lora = Lora({ subsets: ["latin"], variable: '--font-body', weight: ['400', '600'] });
const courier = Courier_Prime({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-typewriter' });

export const metadata: Metadata = {
  title: "Anandwan | Forest of Joy - Baba Amte's Legacy",
  description: "Explore Anandwan, a community rehabilitation centre founded by Baba Amte. Dedicated to the treatment, rehabilitation, and empowerment of leprosy patients and the disabled.",
  keywords: [
    "Anandwan", 
    "Baba Amte", 
    "Maharogi Sewa Samiti", 
    "Social Work India", 
    "Leprosy Rehabilitation", 
    "Warora", 
    "Vikas Amte", 
    "Prakash Amte", 
    "Humanitarian Mission"
  ],
  openGraph: {
    title: "Anandwan: The Forest of Joy",
    description: "Witness the self-sufficient community built by Baba Amte for social outcasts and leprosy survivors.",
    url: "https://your-vercel-domain.vercel.app",
    siteName: "Anandwan Project",
    locale: "en_IN",
    type: "website",
  },
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
