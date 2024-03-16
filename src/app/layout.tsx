import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title = "Kidify";
const description = "A platform to explain complex topics in simple words. It's like you are explaining to a 5 year old.";
const image = "https://utfs.io/f/af1c5a9d-0e02-4764-9bec-5272671f0a1d-ipq0ei.jpg"

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://utfs.io/f/af1c5a9d-0e02-4764-9bec-5272671f0a1d-ipq0ei.jpg"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@maiommhoon",
  },
  metadataBase: new URL("https://utfs.io"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
