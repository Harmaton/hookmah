import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { cn } from "@/lib/utils";
import {
  fontMono,
  fontSans,
  fontPoppins,
  fontLato,
  fontManrope,
  fontCaveat,
} from '@/lib/fonts';
import { Toaster } from "sonner";
import { AOSInit } from "@/components/aos";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  title: "Hokmah ",
  description: "Curated Education Document Content Detailing with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
        <AOSInit />
        <link rel="icon" href="/icon.png" />
          <body
            className={cn(
              "min-h-screen bg-background antialiased scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
              fontSans.variable,
              fontMono.variable,
              fontPoppins.variable,
              fontLato.variable,
              fontManrope.className,
              fontCaveat.variable
            )}
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster position="top-center" richColors />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
