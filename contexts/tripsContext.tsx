import { createContext, useContext, useState } from "react";

interface TripsContextProps {
  tripState: boolean;
  onTrips: (state: boolean) => void;
  noTrip: () => void;
}

export const TripsContext = createContext<Partial<TripsContextProps>>({});

export const useTrips = () => {
  return useContext(TripsContext);
};

export const TripsProvider = ({ children }: any) => {
  const [tripState, setTripState] = useState<boolean>(false);
  const onTrips = (state: boolean) => {
    setTripState(state);
  };
  const noTrip = () => {
    setTripState(false);
  };
  const value = {
    tripState,
    onTrips,
    noTrip,
  };
  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
};
