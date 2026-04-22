import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fridge-to-Recipe | Kook met wat je hebt",
  description: "Voeg ingrediënten toe en ontdek recepten die je kunt maken",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
