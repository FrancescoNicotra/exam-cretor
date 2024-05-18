import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import SideNav from "@/components/SideNav/SideNav";
import { cookies } from "next/headers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = cookies().getAll();
  return (
    <html lang="it" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main
          className={`min-h-screen flex ${
            user.length === 0 && "items-center justify-center"
          }`}
        >
          <SideNav />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
