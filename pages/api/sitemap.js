import { getApp, Credentials } from "realm-web";
import { fetchAllServers } from "../../utils/fetchAllServers"

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')
    
  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
  // Fetch initialSorter and initialFilter from an API or any other initialData source
  const initialSorter = { players: -1 };
  const initialFilter = {
    $and: [{ rank: { $gte: 500 } }, { players: { $gte: 1 } }],
  };

  const appId = "application-0-pcbqz";
  const app = getApp(appId);

  if (app && !app.currentUser) {
    const anonymousUser = Credentials.anonymous();
    await app.logIn(anonymousUser);
    console.log(app);
  }

  const initialData = await fetchAllServers(initialFilter, initialSorter, 0, 500, app);
  console.log(initialData);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    ${initialData.result
      .map((server) => {
        const url = `https://rustserverfilter.com/server/${server.addr}`;
        const lastModDate = new Date();
        lastModDate.setMinutes(0); // Reset minutes to zero
        lastModDate.setSeconds(0); // Reset seconds to zero
        lastModDate.setMilliseconds(0); // Reset milliseconds to zero
        lastModDate.setHours(lastModDate.getHours() - 1); // Subtract an hour from the current time
        const lastModDateTime = lastModDate.toISOString();
        return `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModDateTime}</lastmod>
        </url>
        `;
      })
      .join("")}
  </urlset>`;

  console.log(xml);
  res.end(xml);
}