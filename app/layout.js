
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-oswald",
});

export const metadata = {
  title: {
   
    
  },
  description: "Dyrevelfærd er en platform for dyrevelfærd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="antialised">
        {children}
        
      </body>
    </html>
  );
}
