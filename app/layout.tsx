import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainWrapper from "./components/MainWrapper";
import UseRevealOnScroll from "./components/UseRevealOnScroll";
import { ThemeProvider } from "./components/ThemeProvider";
import CommandPalette from "./components/CommandPalette";
import SwarmRebuildOverlay from "./components/bits/SwarmRebuildOverlay";
import CvPdfModal from "./components/CvPdfModal";
import TopPageProgressBar from "./components/TopPageProgressBar";

export const metadata = {
  title: "Abdul Kader — Full Stack Developer & Digital Solutions Expert",
  description:
    "Portfolio & Interactive CV Abdul Kader, Full Stack Developer berfokus pada pengembangan web modern, integrasi API, DevOps, IoT, dan solusi digital berbasis Laravel, React, serta Next.js.",
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
    "Huawei Developer APAC",
  ],
  authors: [{ name: "Abdul Kader", url: "https://abdkader.my.id" }],
  openGraph: {
    title: "Abdul Kader — Full Stack Developer & Digital Solutions Expert",
    description:
      "Eksplorasi karya, pengalaman, dan keahlian Abdul Kader dalam pengembangan web modern & solusi digital.",
    url: "https://abdkader.my.id",
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
  metadataBase: new URL("https://abdkader.my.id"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdul Kader",
    url: "https://abdkader.my.id/",
    jobTitle: "Full Stack Developer",
    description:
      "Software Engineer berfokus pada Laravel, React, Next.js, Cloud/DevOps, dan IoT.",
    alumniOf: {
      "@type": "Organization",
      name: "Huawei Developer APAC",
    },
    knowsAbout: [
      "Web Development",
      "Artificial Intelligence",
      "Next.js",
      "React",
      "Laravel",
      "DevOps",
      "IoT",
    ],
  };

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className="dark"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <meta name="theme-color" content="#09090b" />
        <meta
          name="google-site-verification"
          content="8nY7z8e81_z2k1nAO5SbEz-x2dxSVgzHugUceJXd5GY"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased relative min-h-screen transition-colors duration-300 selection:bg-indigo-500/30">
        {/* Subtle Architectural Grid + Ambient Spotlight */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-architect" />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-indigo-500/[0.08] dark:bg-indigo-500/[0.12] blur-[120px]" />
        </div>

        <ThemeProvider>
          <TopPageProgressBar />
          <UseRevealOnScroll />
          <SwarmRebuildOverlay />
          <CommandPalette />
          <CvPdfModal />
          <Navbar />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
