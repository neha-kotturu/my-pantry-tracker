import { Inter } from "next/font/google";
import "./globals.css";
import * as React from 'react'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Pantry Tracker",
  description: "Created by Neha Kotturu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
