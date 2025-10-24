export const metadata = {
  title: "Abdul Kader - Full Stack Developer & Digital Solutions Expert",
  description: "Portfolio Abdul Kader",
};

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Tailwind via local build */}
        {/* Font Awesome + Devicon persis seperti HTML kamu */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 overflow-x-hidden">
        <Navbar />
        {/* padding-top to avoid overlap by fixed navbar */}
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
