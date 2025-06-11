import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion-clone",
  description: "The connected workspace where better,faster work happens",
  icons:{
    icon: [
      {
        media:"(prefers-color-scheme:light)",
        url: "/notion-logo.png",
        href: "/notion-logo.png",
      },
      {
        media:"(prefers-color-scheme:dark)",
        url: "/notion-dark.png",
        href: "/notion-dark.png",
      }
      
    ]
  } 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="notion-theme">
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
