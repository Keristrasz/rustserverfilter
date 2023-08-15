import { useEffect } from "react";
import { userLocationType } from "../constants/TGlobal";

type SetUserLocation = React.Dispatch<React.SetStateAction<userLocationType | null>>;

const useGeolocation = (
  userLocation: userLocationType | null,
  setUserLocation: SetUserLocation
) => {
  useEffect(() => {
    if (navigator.geolocation && !userLocation && !navigator.permissions) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          latitude = parseFloat(latitude.toFixed(4));
          longitude = parseFloat(longitude.toFixed(4));
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.info(
            "To see Distance from Rust servers, please allow the browser to access your location and refresh. Info: " +
              error
          );
        }
      );
    }
  }, []);

  return userLocation;
};

export default useGeolocation;
