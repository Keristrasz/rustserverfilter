import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userLocationType } from "@/utils/typesTypescript";

const getLocation = async (): Promise<userLocationType> => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    const { latitude, longitude } = response.data;
    const locationData: userLocationType = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    return locationData;
  } catch (error) {
    throw error;
  }
};

const useQueryLocation = (): userLocationType | undefined => {
  const { data } = useQuery<userLocationType>(["location"], getLocation, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 99999 * 1000,
    cacheTime: 99999 * 1000,
  });

  return data;
};

export default useQueryLocation;
