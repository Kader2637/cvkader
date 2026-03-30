export default function sitemap() {
  const baseUrl = "https://abdkader.my.id";
  
  const staticRoutes = [
    "", 
    "/about",
    "/certificates",
    "/contact",
    "/education",
    "/experience",
    "/portfolio",
    "/skills",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));


  return [...staticRoutes];
}