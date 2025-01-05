import 'animate.css';
import './globals.css'
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import { inter } from "@/utils/fonts";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-bodyColor`}>
        <div
          className={`${inter.variable} container mx-auto min-h-screen flex flex-col`}
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
