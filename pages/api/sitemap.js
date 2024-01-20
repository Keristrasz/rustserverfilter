import { getApp, Credentials } from "realm-web";
import { fetchAllServers } from "../../services/fetchAllServers";
import { typesConfigs } from "../../constants/serverTypeOptions";

export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  const lastModDate = new Date();
  lastModDate.setMinutes(0); // Reset minutes to zero
  lastModDate.setSeconds(0); // Reset seconds to zero
  lastModDate.setMilliseconds(0); // Reset milliseconds to zero
  lastModDate.setHours(lastModDate.getHours() - 1); // Subtract an hour from the current time
  const lastModDateTime = lastModDate.toISOString();

  // Adding the server URLs to staticUrls
  const staticUrls = `
  <url>
    <loc>https://rustserverfilter.com</loc>
    <lastmod>${lastModDateTime}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://rustserverfilter.com/about</loc>
    <lastmod>2024-01-19T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>https://rustserverfilter.com/FAQ</loc>
    <lastmod>2024-01-19T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.50</priority>
  </url>
  ${typesConfigs
    .map(
      (link) => `
  <url>
    <loc>https://rustserverfilter.com/type/${link.href}</loc>
    <lastmod>${lastModDateTime}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.85</priority>
  </url>
  `
    )
    .join("")}
`;
  // Fetch initialSorter and initialFilter from an API or any other initialData source
  const initialSorter = { players: -1 };
  const initialFilter = {
    $and: [{ rank: { $gte: 8000 } }, { players: { $gte: 1 } }],
  };

  const appId = "application-0-pcbqz";
  const app = getApp(appId);

  if (app && !app.currentUser) {
    const anonymousUser = Credentials.anonymous();
    await app.logIn(anonymousUser);
  }

  const initialData = await fetchAllServers(initialFilter, initialSorter, 0, 500, app);

  //2024-01-19T09:00:00.000Z

  const dynamicUrls = initialData.result
    .map((server) => {
      const url = `https://rustserverfilter.com/server-detail/${server.addr
        .split(":")
        .join(".")}`;
      return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModDateTime}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>0.80</priority>
      </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    ${staticUrls}
    ${dynamicUrls}
  </urlset>`;

  res.end(xml);
}
