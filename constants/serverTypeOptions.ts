import { SorterType, FilterType } from "../types/TGlobal";

interface TypesConfig {
  title: string;
  desc: string;
  h1: string;
  addr: string;
  initialSorterSSG: SorterType;
  initialFilterSSG: FilterType;
  href: string;
  text: string;
}
const roundBySeconds = 100;
const nowMiliseconds = () => new Date().getTime();
// if not in function, value is saved on BE and sent with the building date
const nowSeconds = () =>
  Math.floor(nowMiliseconds() / 1000 / roundBySeconds) * roundBySeconds - 100;
const timestampTenMonthsAgo = () =>
  Math.floor((nowMiliseconds() / 1000 - 28000000) / roundBySeconds) * roundBySeconds;

export const typesConfigs: TypesConfig[] = [
  {
    title: "Best 2x Rate Servers | Rust Server Filter - Double the Fun in Rust",
    desc: "Join the fun on the best 2x rate servers. Get more resources, more loot, and level up faster. Perfect for players who want a bit more from their Rust game. Start your adventure on a 2x server today or you can find servers on home page!",
    h1: "BEST 2x RATE SERVERS",
    addr: "https://rustserverfilter.com/type/best-2x-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 20 } }, { rate: { $in: [2] } }],
    },
    href: "best-2x-servers",
    text: "Best Rust 2x servers",
  },
  {
    title: "Best 3x Rate Servers | Rust Server Filter - Find Top Rust 3x Servers",
    desc: "Looking for more action? Check out the best 3x rate servers. You'll get three times the resources, loot, and faster leveling. It's a great way to enjoy Rust with a bit of a boost. Try a 3x server now or you can find servers on home page!",
    h1: "BEST 3x RATE SERVERS",
    addr: "https://rustserverfilter.com/type/best-3x-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 20 } }, { rate: { $in: [3] } }],
    },
    href: "best-3x-servers",
    text: "Best Rust 3x servers",
  },
  {
    title: "Best 5x Rate Servers | Rust Server Filter - Find Top Rust 5x Servers",
    desc: "Ready for a real challenge? Try public top 5x rate servers. With five times the resources, loot, and fast leveling, you'll be in for an intense Rust experience. Dive into a 5x server today here or filter your servers on home page!",
    h1: "BEST 5x RATE SERVERS",
    addr: "https://rustserverfilter.com/type/best-5x-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 20 } }, { rate: { $in: [5] } }],
    },
    href: "best-5x-servers",
    text: "Best Rust 5x servers",
  },
  {
    title: "Best 10x Rate Servers | Rust Server Filter - Find Top Rust 10x Servers",
    desc: "Looking for high-speed action? Here are top public 10x rate servers. With ten times the resources, loot, and ultra-fast leveling, you're set for an extreme Rust experience. Start your journey on a 10x server today, or search with our server filters on home page!",
    h1: "BEST 5x RATE SERVERS",
    addr: "https://rustserverfilter.com/type/best-5x-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 20 } },
        { rate: { $in: [10] } },
      ],
    },
    href: "best-10x-servers",
    text: "Best Rust 10x servers",
  },
  {
    title: "Best 1000x Rate Servers | Rust Server Filter - Find Top Rust 1000x Servers",
    desc: "Find top public 1000x rate servers, best for PVP! With a thousand times the resources, loot, and lightning-fast leveling, you're in for the ultimate Rust experience. Try true pvp action on a 1000x server today, or search with our server filters on home page!",
    h1: "BEST 1000x RATE SERVERS",
    addr: "https://rustserverfilter.com/type/best-1000x-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 20 } },
        { rate: { $in: [1000] } },
      ],
    },
    href: "best-1000x-servers",
    text: "Best Rust 1000x servers",
  },
  {
    title: "Creative Servers | Rust Server Filter - The most popular Creative Servers",
    desc: "Discover top public creative servers, perfect for building! With unlimited resources and free items, you're in for the ultimate Rust creative experience. Start building right now on a creative server today, or search with our server filters on the home page!",
    h1: "BEST CREATIVE SERVERS",
    addr: "https://rustserverfilter.com/type/best-creative-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 20 } },
        { name: { $regex: "creative", $options: "i" } },
      ],
    },
    href: "creative-servers",
    text: "Creative servers",
  },
  {
    title: "Best Quad Servers | Rust Server Filter - Find Top Rust Quad Servers",
    desc: "Looking for quad servers with your teammates? Use advanced server filter with wipe, player count, distance options and more. Find your Rust quad servers now here or go to the home page with advanced filters!",
    h1: "BEST QUAD SERVERS",
    addr: "https://rustserverfilter.com/type/best-quad-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { max_group_size: { $in: [4] } },
      ],
    },
    href: "best-quad-servers",
    text: "Best quad servers",
  },
  {
    title: "Best Trio Servers | Rust Server Filter - Find Top Rust Trio Servers",
    desc: "Looking for the best Rust trio servers with your friends? Explore our advanced server filter with wipe, player count, distance options and more. Find your Rust trio servers now here or go to the home page with advanced filters!",
    h1: "BEST TRIO SERVERS",
    addr: "https://rustserverfilter.com/type/best-trio-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { max_group_size: { $in: [3] } },
      ],
    },
    href: "best-trio-servers",
    text: "Best trio servers",
  },
  {
    title: "Best Duo Servers | Rust Server Filter - Find Top Rust Duo Servers",
    desc: "Are you looking with friend for duo server? Duo adventures with our advanced server filter. Explore top duo servers filtered by player count, rates, and distance. Find your server for an unforgettable duo gaming experience!",
    h1: "BEST DUO SERVERS",
    addr: "https://rustserverfilter.com/type/best-duo-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 2 } },
        { max_group_size: { $in: [2] } },
      ],
    },
    href: "best-duo-servers",
    text: "Best duo servers",
  },
  {
    title: "Best Solo Servers | Rust Server Filter - Find Top Rust Solo Servers",
    desc: "Searching for Rust solo server? Our server filter allows you to filter by wipe frequency, player population, and proximity. Find the best solo servers here today or find more server on the home page!",
    h1: "BEST SOLO SERVERS",
    addr: "https://rustserverfilter.com/type/best-solo-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 2 } },
        { max_group_size: { $in: [1] } },
      ],
    },
    href: "best-solo-servers",
    text: "Best solo servers",
  },
  {
    title: "Best Beginner Servers | Rust Server Filter - Start Your Rust Journey Here",
    desc: "Looking for the best Rust beginner servers for new players? Our server filter allows you to filter by wipe frequency, player activity, and distance. Find your beginner server now or more servers on home page!",
    h1: "BEST BEGINNER SERVERS",
    addr: "https://rustserverfilter.com/type/type/best-beginner-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 2000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "beginner", $options: "i" } },
      ],
    },
    href: "best-beginner-servers",
    text: "Best beginner servers",
  },
  {
    title: "Best PVP Servers | Rust Server Filter - Discover Top Rust PVP Servers",
    desc: "Engage in intense PVP battles on the best Rust servers with our advanced server filter. Filter by wipe cycles, player counts, and distance to find the great PVP battles. Find your server here or go to home page to find more servers!",
    h1: "BEST PVP SERVERS",
    addr: "https://rustserverfilter.com/type/best-pvp-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "pvp", $options: "i" } },
      ],
    },
    href: "best-pvp-servers",
    text: "Best pvp servers",
  },
  {
    title: "Best PVE Servers | Rust Server Filter - Explore Top Rust PVE Realms",
    desc: "Are you looking for PVE gameplay on Rust servers? Filter by wipe cycles, player counts, and distance to find the ultimate PVE realms. Find your server now for a thrilling PVE adventure or visit home page for more!",
    h1: "BEST PVE SERVERS",
    addr: "https://rustserverfilter.com/type/best-pve-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "pve", $options: "i" } },
      ],
    },
    href: "best-pve-servers",
    text: "Best pve servers",
  },
  {
    title: "Best Rust Servers | Rust Server Filter - Find Top Rust Servers",
    desc: "Find the top Rust servers using our powerful server filter. Find your server by sorting servers based on wipe schedules, player populations, and geographical proximity. Join here or visit our home page for better filters!",
    h1: "BEST RUST SERVERS",
    addr: "https://rustserverfilter.com/type/best-rust-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 100 } }],
    },
    href: "best-rust-servers",
    text: "Best rust servers",
  },
  {
    title: "Best Recently Wiped Servers | Rust Server Filter - Start Fresh in Rust",
    desc: "Begin on the recently wiped servers with our advanced server filters. Find fresh Rust servers, filtered by wipe cycles, player counts, and distance. Find freshly just wiped server for a thrilling Rust gameplay or find more server on home page!",
    h1: "BEST RECENTLY WIPED SERVERS",
    addr: "https://rustserverfilter.com/type/best-wiped-servers",
    initialSorterSSG: { born: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { born: { $lte: nowSeconds(), $gte: timestampTenMonthsAgo() } },
      ],
    },
    href: "best-wiped-servers",
    text: "Recently wiped servers",
  },
  {
    title: "Upcoming Wipe Servers | Prepare for Fresh Starts - Wiping soon servers",
    desc: "Get ready for fresh start wiping soon servers with our advanced server filter. Find rust servers about to wipe, rust servers that wipe today, rust servers wiping soon. Find server now and prepare for adventure or use filters on home page",
    h1: "BEST SERVERS WIPING SOON",
    addr: "https://rustserverfilter.com/type/servers-wipe-soon",
    initialSorterSSG: { born_next: 1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { born_next: { $gte: nowSeconds() } },
      ],
    },
    href: "servers-wipe-soon",
    text: "Servers about to wipe",
  },
  {
    title:
      "Facepunch Official Servers | Rust Server Filter - Explore Rust's Official Realms",
    desc: "Immerse yourself in the official Rust experience on the best Facepunch servers. Discover Facepunch official servers, filtered by wipe cycles, player counts, and distance. Join now for Rust gameplay sanctioned by the creators or find more servers on home page!",
    h1: "FACEPUNCH SERVERS",
    addr: "https://rustserverfilter.com/type/facepunch",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "facepunch", $options: "i" } },
      ],
    },
    href: "facepunch",
    text: "Facepunch rust servers",
  },
  {
    title: "Reddit Servers | Rust Server Filter - Join the Reddit Rust Community",
    desc: "Explore the Reddit Rust community on official Reddit servers. Filter by wipe cycles, player counts, and distance to become part of the Reddit Rust adventure. Join now and collaborate with fellow Redditors in Rust!",
    h1: "REDDIT SERVERS",
    addr: "https://rustserverfilter.com/type/reddit",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "reddit", $options: "i" } },
      ],
    },
    href: "reddit",
    text: "Reddit rust servers",
  },
  {
    title: "Rustafied Servers | Rust Server Filter for Rustafied Gaming",
    desc: "Experience Rustafied gaming on their official servers. Customize your gameplay with the server filter, sorting by wipe schedules, player populations, and geographical proximity. Join today for Rustafied-approved Rust gameplay!",
    h1: "RUSTAFIED SERVERS",
    addr: "https://rustserverfilter.com/type/rustafied",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "rustafied", $options: "i" } },
      ],
    },
    href: "rustafied",
    text: "Rustafied rust servers",
  },
  {
    title: "Rusticated Servers | Filter for Rusticated Gaming Experience",
    desc: "Immerse yourself in the Rusticated gaming experience on their official servers. Filter servers by wipe frequency, player activity, and distance for a Rusticated adventure. Join now and enjoy the Rusticated community!",
    h1: "RUSTICATED SERVERS",
    addr: "https://rustserverfilter.com/type/rusticated",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "rusticated", $options: "i" } },
      ],
    },
    href: "rusticated",
    text: "Rusticated rust servers",
  },
  {
    title: "Rustoria Servers | Rust Server Filter - Unleash Rustoria's Gameplay",
    desc: "Unleash Rustoria's gameplay on their official servers. Filter by wipe cycles, player counts, and distance to thrive in the Rustoria realm. Join now and conquer Rustoria's challenges or find more server on home page!",
    h1: "RUSTORIA SERVERS",
    addr: "https://rustserverfilter.com/type/rustoria",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "rustoria", $options: "i" } },
      ],
    },
    href: "rustoria",
    text: "Rustoria rust servers",
  },
  {
    title: "Rusty Moose Servers | RUST Server Filter for Rusty Moose Gaming",
    desc: "Delve into Rusty Moose gaming on their official servers. Customize your Rusty Moose adventure using the server filter, sorting by wipe schedules, player populations, and geographical proximity. Join today and test your skills on Rusty Moose servers!",
    h1: "RUSTY MOOSE SERVERS",
    addr: "https://rustserverfilter.com/type/rusty-moose",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "rusty moose", $options: "i" } },
      ],
    },
    href: "rusty-moose",
    text: "Rusty Moose rust servers",
  },
  {
    title: "Survivors.gg Servers | Filter for Survivors.gg Rust Community",
    desc: "Be a part of the Survivors.gg Rust community on their servers. Filter servers by wipe frequency, player activity, and distance to join the Survivors.gg journey. Find your server now for an engaging Rust experience or find more servers on home page!",
    h1: "SURVIVORS.GG SERVERS",
    addr: "https://rustserverfilter.com/type/survivors",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "survivors.gg", $options: "i" } },
      ],
    },
    href: "survivors",
    text: "Survivors.gg rust servers",
  },
  {
    title: "Vital Rust Servers | Rust Server Filter - Experience Vital Rust",
    desc: "Experience Vital Rust on their official servers. Filter by wipe cycles, player counts, and distance to embark on a Vital Rust adventure. Join now and be a vital part of the Rust community or find more server on home page!",
    h1: "VITAL RUST SERVERS",
    addr: "https://rustserverfilter.com/type/vital-rust",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "vital rust", $options: "i" } },
      ],
    },
    href: "vital-rust",
    text: "Vital Rust servers",
  },
  {
    title: "Warbandits Servers | Rust Server Filter for Warbandits Rust Experience",
    desc: "Immerse yourself in the Warbandits Rust experience on their official servers. Filter with the server filter, sorting by wipe schedules, player populations, and geographical proximity. Join here or go to home page for more servers!",
    h1: "WARBANDITS SERVERS",
    addr: "https://rustserverfilter.com/type/warbandits",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "warbandits", $options: "i" } },
      ],
    },
    href: "warbandits",
    text: "Warbandits Rust servers",
  },
  {
    title: "Rust Zombie Servers | Server Filter for Apocalyptic Gaming",
    desc: "Find Rust zombie servers. Filter, sort by zombie-themed servers, wipe schedules, player populations, and geographical proximity. Join today and survive the zombie-infested Rust world or go find more server on the home page!",
    h1: "ZOMBIE SERVERS",
    addr: "https://rustserverfilter.com/type/zombie-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 3000 } },
        { players: { $gte: 1 } },
        { name: { $regex: "zombie", $options: "i" } },
      ],
    },
    href: "zombie-servers",
    text: "Zombie Rust servers",
  },
];
