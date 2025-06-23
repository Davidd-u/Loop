import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop - Marketplace de Intercambios",
  description:
    "Intercambia productos sin dinero. Encuentra lo que necesitas y ofrece lo que ya no usas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
