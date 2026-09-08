
import "./globals.css";

export const metadata = {
  title: {
   
    
  },
  description: "Dyrevelfærd er en platform for dyrevelfærd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialised">
        {children}
        
      </body>
    </html>
  );
}
