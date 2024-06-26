import { TripHistory } from "@/interfaces/booking";

export function calculateDistanceTrip(tripHistory: TripHistory[] | undefined) {
  if (!tripHistory) {
    return 0;
  }
  let length = tripHistory.length;
  let distance = length / 1000;
  return distance;
}
