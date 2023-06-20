import { useEffect } from "react";
import { userLocationType } from "../utils/typesTypescript";
import { toast } from "react-toastify";

type SetUserLocation = React.Dispatch<React.SetStateAction<userLocationType | null>>;

const useGeolocation = (
  userLocation: userLocationType | null,
  setUserLocation: SetUserLocation
) => {
  useEffect(() => {
    if (navigator.geolocation && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          latitude = parseFloat(latitude.toFixed(4));
          longitude = parseFloat(longitude.toFixed(4));
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error retrieving location:", error);
          // toast.error("Error retrieving your location. Allow geolocation too see distance from rust servers.");
        }
      );
    }
  }, []);

  return userLocation;
};

export default useGeolocation;
