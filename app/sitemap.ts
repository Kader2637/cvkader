export default function sitemap() {
  const baseUrl = "https://abdkader.my.id";

  const routes = [
    "",
    "/projects",
    "/certificates",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  return [...routes];
}