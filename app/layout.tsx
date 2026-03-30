import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainWrapper from "./components/MainWrapper";

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
  // Update metadataBase ke domain utama
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
    "name": "Abdul Kader",
    "url": "https://abdkader.my.id/",
    "jobTitle": "Full Stack Developer",
    "description": "Software Engineer berfokus pada Laravel, React, dan ekosistem Huawei.",
    "alumniOf": {
      "@type": "Organization",
      "name": "Huawei Developer APAC"
    },
    "knowsAbout": ["Web Development", "Artificial Intelligence", "Next.js", "React", "Laravel", "DevOps"]
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <meta name="theme-color" content="#2563eb" />
        <meta
          name="google-site-verification"
          content="8nY7z8e81_z2k1nAO5SbEz-x2dxSVgzHugUceJXd5GY"
        />

        {/* Script JSON-LD Sekarang di posisi yang benar */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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