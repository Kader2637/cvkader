export const metadata = {
  title: "Abdul Kader — Full Stack Developer & Digital Solutions Expert",
  description:
    "Portfolio Abdul Kader, Full Stack Developer berfokus pada pengembangan web modern, integrasi API, DevOps, dan solusi digital berbasis Laravel, React, serta Node.js.",
  keywords: [
    "Abdul Kader",
    "Abdul Kader programmer jawa timur",
    "Full Stack Developer",
    "Laravel Developer",
    "React Developer",
    "Next.js",
    "Web Developer Indonesia",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Abdul Kader", url: "https://abdulkader.vercel.app" }],
  openGraph: {
    title: "Abdul Kader — Full Stack Developer & Digital Solutions Expert",
    description:
      "Eksplorasi karya, pengalaman, dan keahlian Abdul Kader dalam pengembangan web modern & solusi digital.",
    url: "https://abdulkader.vercel.app",
    siteName: "Abdul Kader Portfolio",
    images: [
      {
        url: "/assets/foto/logo.png",
        width: 1200,
        height: 630,
        alt: "Abdul Kader Portfolio Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Kader — Full Stack Developer & Digital Solutions Expert",
    description:
      "Portfolio profesional Abdul Kader — spesialis web, backend, dan DevOps.",
    images: ["/assets/foto/logo.png"],
    creator: "@abdulkader",
  },
  icons: {
    icon: "/assets/foto/favicon.png",
    shortcut: "/assets/foto/favicon.png",
    apple: "/assets/foto/favicon.png",
  },
  metadataBase: new URL("https://abdulkader.vercel.app"),
};

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainWrapper from "./components/MainWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Font Awesome & Devicon */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />

        {/* Favicon */}
        <link rel="icon" href="/assets/foto/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/foto/favicon.png" />
        <meta name="theme-color" content="#2563eb" />

        {/* Extra SEO */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="google-site-verification"
          content="YOUR_GOOGLE_SITE_VERIFICATION_CODE"
        />
      </head>

      <body className="bg-gray-50 text-gray-900 overflow-x-hidden antialiased">
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </body>
    </html>
  );
}
