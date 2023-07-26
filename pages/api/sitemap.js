import { getApp, Credentials } from "realm-web";
import { fetchAllServers } from "../../utils/fetchAllServers";

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

  // Adding the static URLs
  const staticUrls = `
    <url>
      <loc>https://rustserverfilter.com/about</loc>
      <!-- Replace the date below with the last modification date of the "about" page -->
      <lastmod>2023-07-26T00:00:00Z</lastmod>
    </url>

    <url>
      <loc>https://rustserverfilter.com/FAQ</loc>
      <!-- Replace the date below with the last modification date of the "FAQ" page -->
      <lastmod>2023-07-26T00:00:00Z</lastmod>
    </url>
  `;

  // Fetch initialSorter and initialFilter from an API or any other initialData source
  const initialSorter = { players: -1 };
  const initialFilter = {
    $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 1 } }],
  };

  const appId = "application-0-pcbqz";
  const app = getApp(appId);

  if (app && !app.currentUser) {
    const anonymousUser = Credentials.anonymous();
    await app.logIn(anonymousUser);
    console.log(app);
  }

  const initialData = await fetchAllServers(initialFilter, initialSorter, 0, 100, app);
  console.log(initialData);

  const dynamicUrls = initialData.result
    .map((server) => {
      const url = `https://rustserverfilter.com/server/${server.addr}`;
      return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModDateTime}</lastmod>
      </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    ${staticUrls}
    ${dynamicUrls}
  </urlset>`;

  console.log(xml);
  res.end(xml);
}
