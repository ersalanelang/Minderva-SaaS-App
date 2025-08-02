import type { Metadata } from "next";
import { ClerkProviderWrapper } from "@/components/ClerkProviderWrapper";
// import { Geist, Geist_Mono } from 'next/font/google'
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/components/Theme";


// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minderva",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClerkProviderWrapper>
            <div className="min-h-screen">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </ClerkProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}