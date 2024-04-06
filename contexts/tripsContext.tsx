import { createContext, useContext, useState } from "react";

interface TripsContextProps {
  tripState: {
    onTrip: boolean | null;
    bookingId: string;
    cyclingId: string;
    startStation: string;
    status: number;
  };
  onStartTrip: (
    bookingId: string,
    cyclingId: string,
    startStation: string,
    status: number
  ) => void;
  onEndTrip: () => void;
}

export const TripsContext = createContext<Partial<TripsContextProps>>({});

export const useTrips = () => {
  return useContext(TripsContext);
};

export const TripsProvider = ({ children }: any) => {
  const [tripState, setTripState] = useState<{
    onTrip: boolean | null;
    bookingId: string;
    cyclingId: string;
    startStation: string;
    status: number;
  }>({
    onTrip: null,
    bookingId: "",
    cyclingId: "",
    startStation: "",
    status: 0,
  });
  const onStart = (
    bookingId: string,
    cyclingId: string,
    startStation: string,
    status: number
  ) => {
    setTripState({
      onTrip: true,
      bookingId,
      cyclingId,
      startStation: startStation,
      status,
    });
  };
  const onEnd = () => {
    setTripState({
      onTrip: false,
      bookingId: "",
      cyclingId: "",
      startStation: "",
      status: 0,
    });
  };
  const value = {
    tripState,
    onStartTrip: onStart,
    onEndTrip: onEnd,
  };
  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
};
