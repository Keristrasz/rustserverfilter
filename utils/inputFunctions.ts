import axios from "axios";
import { LocationData } from "./typesTypescript";
import { format, formatDistanceToNow, formatDistance } from "date-fns";

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.floor(earthRadius * c);

  return distance;
}

// export function getCustomDate(timestamp: number) {
//   if (timestamp == null) {
//     return "";
//   }
//   if (timestamp < 1652630662) {
//     return "Too soon / too long ago";
//   }

//   const now = new Date();
//   const currentTimestamp = Math.floor(now.getTime() / 1000);

//   if (currentTimestamp - timestamp < 3600 && currentTimestamp - timestamp > 0) {
//     const minutes = Math.floor((currentTimestamp - timestamp) / 60);
//     return `${minutes} minutes ago`;
//   }

//   if (Math.abs(currentTimestamp - timestamp) < 3600) {
//     const minutes = Math.floor(Math.abs(currentTimestamp - timestamp) / 60);
//     return `In ${minutes} minutes`;
//   }

//   const date = new Date(timestamp * 1000);
//   const formattedDate = date.toLocaleString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });

//   const dayMonth = date.toLocaleString("en-US", {
//     day: "2-digit",
//     month: "short",
//   });

//   return `${formattedDate}, ${dayMonth}`;
// }
//

export function getCustomDate(timestamp: number) {
  if (timestamp == null) {
    return "";
  }
  if (timestamp < 1652630662) {
    return "Too soon / too long ago";
  }

  const now = new Date();

  const timeDifference = now.getTime() - timestamp * 1000;

  if (timeDifference < 3600000 && timeDifference > 0) {
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes} minutes ago`;
  }

  if (Math.abs(timeDifference) < 3600000) {
    const minutes = Math.floor(Math.abs(timeDifference) / 60000);
    return `In ${minutes} minutes`;
  }

  return format(new Date(timestamp * 1000), "HH:mm, MMM dd");
}

export function getTimeUptime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();

  return `${hours} hours `;
}

export async function getLocation(ip: string): Promise<LocationData> {
  const url = `https://ipapi.co/${ip}/json`;

  try {
    const response = await axios.get(url);
    const { latitude, longitude, country_name, city, region } = response.data;
    const returnData: LocationData = {
      latitude,
      longitude,
      country: country_name,
      city,
      region,
    };
    return returnData;
  } catch (error) {
    error;
    throw error;
  }
}
