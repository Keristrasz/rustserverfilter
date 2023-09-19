## TODO

### Toggle full view

To implement the functionality in a Next.js project, follow these steps:

Create a new Next.js component or open an existing one.

Add the button element to your component's JSX:

jsx

Copy code
<button onClick={toggleFullView}>Switch to Full View</button>
Define the CSS styles for the full view mode in a CSS file or a CSS module.

Implement the toggleFullView function within your Next.js component. You can use the useEffect hook to add or remove the full-view class on the document body or any appropriate container element. Here's an example:

jsx
Copy code
import { useEffect } from 'react';

function YourComponent() {
useEffect(() => {
const toggleFullView = () => {
const bodyElement = document.querySelector('body'); // Change the selector as needed
bodyElement.classList.toggle('full-view');
};

    return () => {
      const bodyElement = document.querySelector('body'); // Change the selector as needed
      bodyElement.classList.remove('full-view');
    };

}, []);

return (
// Your component's JSX
<button onClick={toggleFullView}>Switch to Full View</button>
);
}

export default YourComponent;
Make sure to import the necessary CSS file or CSS module in your Next.js component to apply the full-view class styles.
By following these steps, you should be able to implement the "Switch to Full View" functionality in a Next.js component. Remember to adjust the CSS selectors and styles according to your specific requirements and preferences.

### Form expandable

###

/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
reactStrictMode: false,
typescript: {
// !! WARN !!
// Dangerously allow production builds to successfully complete even if
// your project has type errors.
// !! WARN !!
ignoreBuildErrors: true,
},

//for caching the pages correctly, but doesnt look like its working?
// async headers() {
// return [
// {
// source: "/path/to/static/page",
// headers: [
// {
// key: "Cache-Control",
// value: "s-maxage=600, stale-while-revalidate",
// },
// ],
// },
// ];
// },

async headers() {
return [
{
source: "/(.\*)",
headers: [
// Defaultly set with Vercel for 2 years, only HTTPS is allowed
{
key: "Strict-Transport-Security",
value: "max-age=63072000; includeSubDomains; preload",
},
// Helps prevent cross-site scripting (XSS), clickjacking and other code injection attacks.
{
key: "Content-Security-Policy",
value:
"default-src 'self'; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; img-src 'self'; script-src 'self' https://vercel.live https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://realm.mongodb.com https://vitals.vercel-insights.com/ https://ipapi.co/;",
},
// Site cannot be loaded as iframe (like yb videos) in any other website
{
key: "X-Frame-Options",
value: "DENY",
},
// Denies MIME-sniff
{
key: "X-Content-Type-Options",
value: "nosniff",
},
// How much information the browser includes when navigating from the current website (origin) to another | origin-when-cross-origin saves also parameter of URL, but only host, port, url is saved
{
key: "Referrer-Policy",
value: "origin-when-cross-origin",
},
// Allows only geolocation usage
{
key: "Permissions-Policy",
value:
"camera=(); battery=(); geolocation=(self); microphone=(); payment=(); gyroscope=(); magnetometer=()",
},
// Protection for older browsers
{
key: "X-XSS-Protection",
value: "1; mode=block",
},
],
},
];
},
};

module.exports = nextConfig;
