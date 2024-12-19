import { Figtree } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Provider from "./_trpc/Provider";

const figTree = Figtree({
  variable: "--font-fig-tree",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figTree.variable} antialiased`}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
