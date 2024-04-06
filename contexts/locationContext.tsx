import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CoordinateInterface } from "../interfaces/coordinate";
import { LocationSubscription } from "expo-location";
import * as Location from "expo-location";
import { Alert } from "react-native";

let watchId: LocationSubscription;

interface LocationContextProps {
  coordinate: {
    latitude: string;
    longitude: string;
  };
}

export const LocationContext = createContext<Partial<LocationContextProps>>({});

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }: any) => {
  const [coordinate, setCoordinate] = useState<CoordinateInterface>({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    startWatchingLocation();
  }, []);

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    };
    setCoordinate(currentLocation);
  }

  const startWatchingLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      watchId = await Location.watchPositionAsync(
        { distanceInterval: 100 },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCoordinate({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
        }
      );
    } catch (error) {
      console.log("Error watching position:", error);
    }
  };

  const value = {
    coordinate,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
