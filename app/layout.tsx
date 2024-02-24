import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Header } from "@/components/common/header/header";
import { Toaster } from "@/components/ui/toaster";
import GoogleOAuthProvider from "@/components/provider/google-oauth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Segment3d App",
  description: "Generated 3D Model by Utilizing Gaussian Splatting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <GoogleOAuthProvider>
          <ThemeProvider>
            <Toaster />
            <Header />
            {children}
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
