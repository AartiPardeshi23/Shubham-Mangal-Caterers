import "./globals.css";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","700"] });

export const metadata = {
  title: "Wedding Catering & Decoration in Chhatrapati Sambhajinagar",
  description: "Premium wedding catering & mandap decoration services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}