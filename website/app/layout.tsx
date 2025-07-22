import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZA Public DataSet",
  description: "An open source service of South African public data",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
