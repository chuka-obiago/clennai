import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.clennai.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.clennai.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://www.clennai.com/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://www.clennai.com/terms",
      lastModified: new Date(),
    },
    {
      url: "https://www.clennai.com/cookies",
      lastModified: new Date(),
    },
  ];
}