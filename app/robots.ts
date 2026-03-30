export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", 
    },
    sitemap: "https://abdkader.my.id/sitemap.xml",
  };
}