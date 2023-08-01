const roundBySeconds = 100;
const nowMiliseconds = new Date().getTime();
const nowSeconds = Math.floor(nowMiliseconds / 1000 / roundBySeconds) * roundBySeconds - 100;
import { SorterType, FilterType } from "../utils/typesTypescript";

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

export const typesConfigs: TypesConfig[] = [
  {
    title: "Best 2x Rate Servers | Rust Server Filter - Double the Fun in Rust",
    desc: "Experience twice the excitement on the best 2x rate servers with our advanced server filter. Find servers with 2x rates for resources, loot, and progression, filtered by wipe cycles, player counts, and distance. Find your 2x server for Rust adventure!",
    h1: "BEST 2x RATE SERVERS",
    addr: "https://rustserverfilter.com/types/types/best-2x-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 20 } }, { rate: { $in: [2] } }],
    },
    href: "best-2x-servers",
    text: "Best rust 2x servers",
  },
  {
    title: "Best Trio Servers | Rust Server Filter - Find Top Rust Trio Servers",
    desc: "Looking for the best Rust trio servers? Explore our advanced server filter with wipe, player count, distance options and more. Find your Rust trio servers now!",
    h1: "BEST TRIO SERVERS",
    addr: "https://rustserverfilter.com/types/best-trio-servers",
    initialSorterSSG: { born: -1 },
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
    title: "Best Duo Servers | Rust Server Filter - Find Top Rust Duo Adventures",
    desc: "Embark on epic Rust duo adventures with our advanced server filter. Explore top duo servers filtered by player count, rates, and distance. Find your server for an unforgettable duo gaming experience!",
    h1: "BEST DUO SERVERS",
    addr: "https://rustserverfilter.com/types/best-duo-servers",
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
    desc: "Searching for Rust solo servers? Our server filter allows you to narrow down options by wipe frequency, player population, and proximity. Don't compromise – find the best solo servers today!",
    h1: "BEST SOLO SERVERS",
    addr: "https://rustserverfilter.com/types/best-solo-servers",
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
    desc: "Looking for the best Rust beginner servers for new players? Our server filter allows you to narrow down options by wipe frequency, player activity, and distance. Find your beginner server now!",
    h1: "BEST BEGINNER SERVERS",
    addr: "https://rustserverfilter.com/types/types/best-beginner-servers",
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
    desc: "Engage in intense PVP battles on the best Rust servers with our advanced server filter. Filter by wipe cycles, player counts, and distance to find the ultimate PVP arenas. Find your server now for adrenaline-pumping action!",
    h1: "BEST PVP SERVERS",
    addr: "https://rustserverfilter.com/types/best-pvp-servers",
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
    desc: "Immerse yourself in the best PVE gameplay on Rust servers with our advanced server filter. Filter by wipe cycles, player counts, and distance to find the ultimate PVE realms. Find your server now for a thrilling PVE adventure!",
    h1: "BEST PVE SERVERS",
    addr: "https://rustserverfilter.com/types/best-pve-servers",
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
    desc: "Find the top Rust servers using our powerful server filter. Customize your gaming adventure by sorting servers based on wipe schedules, player populations, and geographical proximity. Join today and dominate the Rust world!",
    h1: "BEST RUST SERVERS",
    addr: "https://rustserverfilter.com/types/best-rust-servers",
    initialSorterSSG: { players: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 100 } }],
    },
    href: "best-rust-servers",
    text: "Best rust servers",
  },
  {
    title: "Best Recently Wiped Servers | Rust Server Filter - Start Fresh in Rust",
    desc: "Begin anew on the best recently wiped servers with our advanced server filter. Find fresh Rust servers, filtered by wipe cycles, player counts, and distance. Find freshly just wiped server for a thrilling Rust gameplay!",
    h1: "BEST RECENTLY WIPED SERVERS",
    addr: "https://rustserverfilter.com/types/best-wiped-servers",
    initialSorterSSG: { born: -1 },
    initialFilterSSG: {
      $and: [{ rank: { $gte: 4000 } }, { players: { $gte: 1 } }],
    },
    href: "best-wiped-servers",
    text: "Best wiped just now servers",
  },
  {
    title: "Upcoming Wipe Servers | Prepare for Fresh Starts - Wiping soon servers",
    desc: "Get ready for fresh start wiping soon servers with our advanced server filter. Find rust server about to wipe, rust servers that wipe today, rust servers wiping soon. Find server now and prepare for a wipe-reset thrill!",
    h1: "BEST SERVERS WIPING SOON",
    addr: "https://rustserverfilter.com/types/servers-wipe-soon",
    initialSorterSSG: { born_next: -1 },
    initialFilterSSG: {
      $and: [
        { rank: { $gte: 4000 } },
        { players: { $gte: 1 } },
        { born_next: { $gte: nowSeconds } },
      ],
    },
    href: "servers-wipe-soon",
    text: "Servers about to wipe",
  },
  {
    title: "Facepunch Official Servers | Rust Server Filter - Explore Rust's Official Realms",
    desc: "Immerse yourself in the official Rust experience on the best Facepunch servers. Discover Facepunch official servers, filtered by wipe cycles, player counts, and distance. Join now for Rust gameplay sanctioned by the creators!",
    h1: "FACEPUNCH SERVERS",
    addr: "https://rustserverfilter.com/types/facepunch",
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
    addr: "https://rustserverfilter.com/types/reddit",
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
    addr: "https://rustserverfilter.com/types/rustafied",
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
    addr: "https://rustserverfilter.com/types/rusticated",
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
    desc: "Unleash Rustoria's gameplay on their official servers. Filter by wipe cycles, player counts, and distance to thrive in the Rustoria realm. Join now and conquer Rustoria's challenges!",
    h1: "RUSTORIA SERVERS",
    addr: "https://rustserverfilter.com/types/rustoria",
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
    addr: "https://rustserverfilter.com/types/rusty-moose",
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
    desc: "Be a part of the Survivors.gg Rust community on their servers. Filter servers by wipe frequency, player activity, and distance to join the Survivors.gg journey. Find your server now for an engaging Rust experience!",
    h1: "SURVIVORS.GG SERVERS",
    addr: "https://rustserverfilter.com/types/survivors",
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
    desc: "Experience Vital Rust on their official servers. Filter by wipe cycles, player counts, and distance to embark on a Vital Rust adventure. Join now and be a vital part of the Rust community!",
    h1: "VITAL RUST SERVERS",
    addr: "https://rustserverfilter.com/types/vital-rust",
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
    desc: "Immerse yourself in the Warbandits Rust experience on their official servers. Customize your gaming adventure using the server filter, sorting by wipe schedules, player populations, and geographical proximity. Find server and join the Warbandits Rust realm!",
    h1: "WARBANDITS SERVERS",
    addr: "https://rustserverfilter.com/types/warbandits",
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
    desc: "Dive into apocalyptic gaming on Rust zombie servers. Customize your gameplay with the server filter, sorting by zombie-themed servers, wipe schedules, player populations, and geographical proximity. Join today and survive the zombie-infested Rust world!",
    h1: "ZOMBIE SERVERS",
    addr: "https://rustserverfilter.com/types/zombie-servers",
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
