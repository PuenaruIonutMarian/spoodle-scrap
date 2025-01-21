import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import {ClerkProvider} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spoodle Scratch",
  description: "An performat web scrapper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"} appearance={{elements:{formButtonPrimary:"bg-primary hover:bg-primary/90 text-sm !shadow-none",}}}>
      <html lang="en">
        <body className={inter.className}>
          <AppProviders>{children}</AppProviders>
          <Toaster richColors/>
        </body>

      </html>
    </ClerkProvider>
  );
}
