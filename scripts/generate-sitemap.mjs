// import { getSortedPostsData } from '../../lib/posts'; // Import your function to fetch dynamic data

// export default function handler(req, res) {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/xml');
//   res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

//   // Fetch the dynamic data for generating URLs
//   const posts = getSortedPostsData(); // Replace this with your own function to fetch the dynamic data

//   // Generate the XML for each dynamic post
//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
//       ${posts
//         .map((post) => {
//           return `
//           <url>
//             <loc>https://your-vercel-app-url/posts/${post.slug}</loc>
//             <lastmod>${post.date}</lastmod>
//           </url>
//           `;
//         })
//         .join('')}
//     </urlset>`;

//   res.end(xml);
// }
