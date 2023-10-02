import axios from "axios";
import { LocationData } from "../types/TGlobal";

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
