import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://corrjewelry.vn";

  // Static pages
  const staticPages = [
    "",
    "/gioi-thieu",
    "/lien-he",
    "/blog",
    "/bang-size",
    "/sale-off",
    "/bo-suu-tap",
    "/nam",
    "/nu",
    "/unisex",
    "/tat-ca-san-pham",
  ];

  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic product pages - fetch from Strapi
  let productSitemap: MetadataRoute.Sitemap = [];
  try {
    const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
    const apiUrl = process.env.NEXT_PUBLIC_URL_BE;

    // Skip API calls if environment variables are not set (e.g., during build)
    if (!apiUrl || !token) {
      console.log("Sitemap: Skipping API calls - env vars not set");
      return staticSitemap;
    }

    const response = await fetch(
      `${apiUrl}/api/san-phams?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (response.ok) {
      const data = await response.json();
      productSitemap = data.data.map((product: any) => ({
        url: `${baseUrl}/san-pham/${product.attributes.slug}`,
        lastModified: new Date(product.attributes.updatedAt),
        changeFrequency: "daily" as const,
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Dynamic blog pages
  let blogSitemap: MetadataRoute.Sitemap = [];
  try {
    const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
    const apiUrl = process.env.NEXT_PUBLIC_URL_BE;

    const response = await fetch(
      `${apiUrl}/api/posts?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=500`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (response.ok) {
      const data = await response.json();
      blogSitemap = data.data.map((post: any) => ({
        url: `${baseUrl}/blog/${post.attributes.slug}`,
        lastModified: new Date(post.attributes.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  return [...staticSitemap, ...productSitemap, ...blogSitemap];
}
