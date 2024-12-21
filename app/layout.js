import { Onest } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const inter = Onest({ subsets: ["latin"] });

export const metadata = {
  title: "PhraseBox",
  description: "Create compelling microcopy",
};

export default function RootLayout({ children }) {
  return (
  <ClerkProvider touchSession={false}>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}
