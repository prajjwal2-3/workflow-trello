
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession, Session } from "next-auth";
import "./globals.css";
import { authOptions } from "@/lib/AuthOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello Kanban Board",
  description: "Made with ❤️ by prajjwal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
   
     <html lang="en">
      <body className={inter.className}>  
        <Providers session={session}>
          {children}
          
          </Providers>
          <Toaster />
          </body>
    </html>
   
  );
}
